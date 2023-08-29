#!/usr/bin/env python3
""" i18n Application """

from flask import Flask, render_template


app: Flask = Flask('__name__')


@app.route('/', strict_slashes=False)
def home() -> str:
    return render_template('0-index.html')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
