#!/usr/bin/env python3
""" i18n Application """

from flask import Flask, render_template
from flask_babel import Babel


app: Flask = Flask('__name__')
babel: Babel = Babel(app)


class Config:
    """ The Config Class """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)


@app.route('/', strict_slashes=False)
def home() -> str:
    """ Render the Home/Index HTML page """
    return render_template('1-index.html')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
