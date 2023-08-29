#!/usr/bin/env python3
""" i18n Application """

from typing import Optional
from flask import Flask, render_template, request
from flask_babel import Babel, _


app: Flask = Flask('__name__')
babel: Babel = Babel(app)


class Config:
    """ The Config Class """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


@babel.localeselector
def get_locale() -> Optional[str]:
    """ Returns the best match with our supported languages """
    return request.accept_languages.best_match(Config.LANGUAGES)


app.config.from_object(Config)


@app.route('/', strict_slashes=False)
def home() -> str:
    return render_template('3-index.html', home_title=_('home_title'),
                           home_header=_('home_header'))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
