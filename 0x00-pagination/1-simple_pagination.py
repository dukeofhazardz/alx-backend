#!/usr/bin/env python3
""" The Server Class """
import csv
import math
from typing import List


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """ A method find the correct indexes to paginate the dataset correctly
            and return the appropriate page of the dataset (i.e. the correct
            list of rows). """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0
        page_range: tuple = self.index_range(page, page_size)
        data = self.dataset()
        data = data[page_range[0]: page_range[1]]
        return data

    def index_range(self, page: int, page_size: int) -> tuple:
        """ A method that returns a tuple of size two containing
            a start index and an end index corresponding to the range
            of indexes to return in a list for those particular
            pagination parameters. """
        start_idx = (page - 1) * page_size
        end_idx = start_idx + page_size
        return start_idx, end_idx
