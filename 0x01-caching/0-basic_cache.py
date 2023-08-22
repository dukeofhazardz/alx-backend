#!/usr/bin/python3
""" BasicCache Class that inherits from BaseCaching """
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """ The BasicCache class """
    def __init__(self):
        """ Initializes the BasicCache class """
        super().__init__()

    def put(self, key, item):
        """ The method that Adds an item in the cache """
        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        """ The method that Get an item by key
        """
        if key is None or key not in self.cache_data.keys():
            return None
        return self.cache_data[key]
