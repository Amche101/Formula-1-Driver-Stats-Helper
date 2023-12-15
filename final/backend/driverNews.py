import pandas as pd

def drivers_top_news(scoredList, links, titles, top_n):
    # for the return
    driver_news = {}

    # iterate over each news and its driver scores
    for news in scoredList:
        for news_id, scores in news.items():
            for driver, score in scores:
                # not returning the news that is not related at all
                if score == 0:
                    continue

                # Add driver's news to the dictionary
                if driver not in driver_news:
                    driver_news[driver] = [(links[news_id], score, titles[news_id])]
                else:
                    driver_news[driver].append((links[news_id], score, titles[news_id]))
                    # print(news_id)

                    # sort and keep only the top n news based on the score
                    driver_news[driver] = sorted(driver_news[driver], key=lambda x: x[1], reverse=True)[:top_n]

    return driver_news

def drivers_news_df(driver_news, top_n):
    # for the return
    data = []
    for driver, news in driver_news.items():
        # get the URLs and titles
        urls = [item[0] for item in news]
        titles = [item[2] for item in news]

        # pad the lists if they have less than 'top_n' items
        urls += [None] * (top_n - len(urls))
        titles += [None] * (top_n - len(titles))

        # row is the driver
        # first n columns are the urls
        # later n columns are titles
        row = [driver] + urls + titles
        data.append(row)

    # adding column names
    url_columns = [f'URL_{i+1}' for i in range(top_n)]
    title_columns = [f'Title_{i+1}' for i in range(top_n)]
    columns = ['Driver'] + url_columns + title_columns

    # return
    df = pd.DataFrame(data, columns=columns)
    return df