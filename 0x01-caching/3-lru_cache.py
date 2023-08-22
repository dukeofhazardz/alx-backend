#!/usr/bin/python3
""" LRUCache Class that inherits from BaseCaching """
from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """ The LRUCache Class """
    def __init__(self):
        """ Initializes the LRUCache Class """
        super().__init__()

    def put(self, key, item):
        """ The method that Adds an item in the cache """
        if key is None or item is None:
            return
        self.cache_data[key] = item
        if len(self.cache_data.keys()) > self.MAX_ITEMS:
            discard_key = list(self.cache_data.keys())[0]
            print("DISCARD: {}".format(discard_key))
            del self.cache_data[discard_key]

    def get(self, key):
        """ The method that Get an item by key
        """
        if key is None or key not in self.cache_data.keys():
            return None
        value = self.cache_data.pop(key)
        self.cache_data[key] = value
        return self.cache_data[key]
