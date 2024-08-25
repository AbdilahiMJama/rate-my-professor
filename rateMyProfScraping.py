#!/usr/bin/env python
# coding: utf-8

import requests
from bs4 import BeautifulSoup
import json
import sys

def getReviewData(url):
  # Send a GET request to the URL
  response = requests.get(url)

  # Parse the HTML content
  soup = BeautifulSoup(response.content, 'html.parser')

  # Find name
  profName = soup.find('div', class_="NameTitle__Name-dowf0z-0 cfjPUG")

  # Find star rating
  starRating = soup.find('div', class_="RatingValue__Numerator-qw8sqy-2 liyUjw")

  # Find reviews
  ratingBody = soup.find_all('div', class_="Rating__RatingInfo-sc-1rhvpxz-3 kEVEoU")

  # List of reviews
  jsonList = []

  for rating in ratingBody:
    ratingBodySubject = rating.find( 'div',class_='RatingHeader__StyledClass-sc-1dlkqw1-3 eXfReS')
    ratingBodyReview = rating.find( 'div',class_="Comments__StyledComments-dzzyvm-0 gRjWel")

    format = {
          'professor': profName.text,
          'stars':starRating.text,
          'subject':ratingBodySubject.text,
          'review':ratingBodyReview.text,
        }
    jsonList.append(format)

  formatFinal = {
      'reviews': jsonList
    }
  
  return formatFinal


  
def main(arg1):
  # URL of the website you want to scrape
  # url = "https://www.ratemyprofessors.com/professor/1259085"
  reviewData = getReviewData(arg1)
  # print(reviewData)

  # Writing to reviewData.json
  with open('reviewData.json', 'w') as json_file:
      json.dump(reviewData, json_file, indent=4)

print("Scraping is finished")

if __name__ == "__main__":
  main(sys.argv[1])


