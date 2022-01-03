import cv2
import matplotlib.pyplot as plt
from pathlib import Path
import argparse
import time
import mysql.connector
from config import Settings
# from model.model import *
from fastapi import HTTPException
from typing import List, Optional

from detect.src.lp_recognition import E2E
import os

class detectService:
    def __init__(self, ):
        self.config = Settings()
    


    def get_arguments():
        arg = argparse.ArgumentParser()
        arg.add_argument('-i', '--image_path', help='link to image', default="detect/samples/1.jpg")
        print(arg.parse_args())
        return arg.parse_args()

    def do_detect(self, img_path:str):

        # read image
        img = cv2.imread(img_path)

        # start
        start = time.time()

        # load model
        model = E2E()

        # recognize license plate
        image = model.predict(img)

        # end
        end = time.time()

        print('Model process on %.2f s' % (end - start))

        # show image
        # plt.imshow(image)
        # plt.show()
        # cv2.imshow('License Plate', image)
        # if cv2.waitKey(0) & 0xFF == ord('q'):
        #     exit(0)

        # cv2.destroyAllWindows()
        return {image}