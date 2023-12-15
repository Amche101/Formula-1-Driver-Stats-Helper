import nltk
import ssl
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# download the NLTK data
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

def preprocess_text(text):
    # tokenisze
    tokens = word_tokenize(text)

    # stopwoeds
    stop_words = set(stopwords.words('english'))
    filtered_tokens = [word for word in tokens if word.lower() not in stop_words]

    # stemming and lemmatization
    stemmer = PorterStemmer()
    lemmatizer = WordNetLemmatizer()
    stemmed_and_lemmatized_tokens = [lemmatizer.lemmatize(stemmer.stem(word)) for word in filtered_tokens]

    preprocessed_text = ' '.join(stemmed_and_lemmatized_tokens)
    return preprocessed_text

def scoring(docs, titles, drivers, title_importance=0.7):
    # preprocess the texts
    preprocessed_titles = [preprocess_text(title) for title in titles]
    preprocessed_docs = [preprocess_text(doc) for doc in docs]

    # combining the title with content with adjusted weights
    combined_docs = []
    for title, doc in zip(preprocessed_titles, preprocessed_docs):
        total_length = len(title) + len(doc)
        # The -1 here is to adjust the ratio so that it starts from 0
        # (when the lengths of the title and the content are equal),
        # ensuring that the baseline of 1 is not affected when title_importance
        # is 0.
        # if title importance is 0, then we won't amplify the title
        title_weight = round(1 + ((total_length / len(title)) - 1) * title_importance*0.1)
        combined_doc = (title + " ") * title_weight + doc
        combined_docs.append(combined_doc)

    # using TFIDF
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(combined_docs)

    # for the return
    results = []

    # loop through each document and driver
    for doc_idx, doc in enumerate(combined_docs):
        doc_scores = {}
        for driver in drivers:
            # create a TFIDF vector for the driver
            preprocessed_driver = preprocess_text(driver)
            driver_vec = vectorizer.transform([preprocessed_driver])

            # score using cosine similarty
            score = cosine_similarity(tfidf_matrix[doc_idx], driver_vec)[0][0]
            doc_scores[driver] = score

        # sort the drivers for each document
        sorted_scores = sorted(doc_scores.items(), key=lambda item: item[1], reverse=True)
        results.append({doc_idx: sorted_scores})

    return results