import requests
from bs4 import BeautifulSoup
import pandas as pd

def scrape_driver_news_info(i):
  # drivers_articles = {}
  article_links = []
  article_titles = []
  article_content = []
  # for driver_name in driver_names:
  for page in range(i):
    url = 'https://www.formula1.com/en/latest/all?page={}'.format(page+1)

    response = requests.get(url)


    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        news_articles = soup.find_all('a', class_='group', href=True)

        if news_articles:
            # print(f"Recent news about {driver_name}:")
            for article in news_articles:

              title_text = str(article['title']).upper()
              # driver_full_name = driver_name.upper()
              # driver_first_name = driver_name.split()[0].upper()
              # driver_last_name = driver_name.split()[-1].upper()

              # if (driver_full_name in title_text or
              #     driver_first_name in title_text or
              #     driver_last_name in title_text):
              article_links.append(article['href'])
              article_titles.append(title_text)

              contentURL = requests.get(article['href'])

              if contentURL.status_code == 200:
                  contentSoup = BeautifulSoup(contentURL.content, 'html.parser')

                  article_para = ""
                  article_text = contentSoup.find_all('div', class_='f1-article--rich-text')

                  if article_text:
                    for paragraph in article_text:
                      text = paragraph.text.strip()
                      article_para += f"{text}\n"
                    article_content.append(article_para)


  return article_links, article_titles, article_content