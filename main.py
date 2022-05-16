from multiprocessing import context
import webapp2
import os
from google.appengine.ext.webapp import template

class MainPage(webapp2.RedirectHandler):
    def get(self):
        path = os.path.join(os.path.dirname(__file__), "index.html")
        self.response.out.write(template.render(path, context))