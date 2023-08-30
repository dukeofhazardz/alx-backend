#!/usr/bin/env python3
""" i18n Application """

from typing import Optional
from flask import Flask, render_template, request, g
from flask_babel import Babel, _


app: Flask = Flask('__name__')
babel: Babel = Babel(app)
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


class Config:
    """ The Config Class """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


def get_user(user_id: int) -> dict:
    """ Returns a user dictionary or None if the ID cannot be
        found or if login_as was not passed """
    return users.get(user_id)


@app.before_request
def before_request() -> None:
    """ Uses get_user to find a user if any, and set it as
        a global on flask.g.user """
    user_id = request.args.get('login_as')
    if user_id:
        g.user = get_user(int(user_id))
    else:
        g.user = None


@babel.localeselector
def get_locale() -> Optional[str]:
    """ Returns the best match with our supported languages """
    if 'locale' in request.args and request.args['locale'] in Config.LANGUAGES:
        return request.args['locale']
    return request.accept_languages.best_match(Config.LANGUAGES)


app.config.from_object(Config)


@app.route('/', strict_slashes=False)
def home() -> str:
    """ Renders the Home/Index HTML page """
    return render_template('5-index.html', home_title=_('home_title'),
                           home_header=_('home_header'), user=g.user)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
