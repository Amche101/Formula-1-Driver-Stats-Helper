from flask import Flask, jsonify
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

def perform_data_processing():
    drivers = [
      "Max Verstappen", "Logan Sargeant", "Daniel Ricciardo", "Lando Norris",
      "Pierre Gasly", "Sergio Perez", "Fernando Alonso", "Charles Leclerc",
      "Lance Stroll", "Kevin Magnussen", "Nyck de Vries", "Yuki Tsunoda",
      "Alex Albon", "Guanyu Zhou", "Nico Hulkenberg", "Esteban Ocon",
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
    return jsonify(json_data)

if __name__ == '__main__':
    app.run(debug=True)