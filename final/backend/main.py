from flask import Flask, jsonify
from flask_cors import CORS
from webCrawling import scrape_driver_news_info
from scoring import scoring
from driverNews import drivers_top_news, drivers_news_df

import nltk
import ssl

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

app = Flask(__name__)
CORS(app)

def perform_data_processing():

    # The title importance here is to adjust the title weight
    # Larger title importance means the title has a larger effect on the relevance
    # The min for this parameter is 0, which means it will assign no extra weight to the title
    # A recommended title importance for average news articles with a title word count to content word count ratio of 1:45 is suggested to be 0.5 to 1
    
    drivers = [
      "Max Verstappen", "Logan Sargeant", "Daniel Ricciardo", "Lando Norris",
      "Pierre Gasly", "Sergio Pérez", "Fernando Alonso", "Charles Leclerc",
      "Lance Stroll", "Kevin Magnussen", "Nyck de Vries", "Yuki Tsunoda",
      "Alex Albon", "Guanyu Zhou", "Nico Hülkenberg", "Esteban Ocon",
      "Liam Lawson", "Lewis Hamilton", "Carlos Sainz", "George Russell", "Valtteri Bottas", 'Oscar Piastri'
    ]

    linkTest, titleTest, contentTest = scrape_driver_news_info(10)
    links = linkTest
    titleImportance = 0.5
    scored_results = scoring(contentTest, titleTest, drivers, titleImportance)
    top_n = 10
    driversNews = drivers_top_news(scored_results, links, titleTest, top_n)
    df = drivers_news_df(driversNews, top_n)
    return df.to_json(orient='records')

@app.before_first_request
def startup():
    global json_data
    print('Starting up the server')
    json_data = perform_data_processing()
    print('Server is ready to handle requests')

@app.route('/api/data')
def get_data():
    return json_data

if __name__ == '__main__':
    app.run(debug=True)
