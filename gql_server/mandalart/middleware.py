"""
ref: https://github.com/recamshak/django-debug-panel/issues/17#issuecomment-366268893

This is to patch django-debug-panel to work with latest versions of
django-debug-toolbar.  The issue is SQL is double-escaped so this
version only calls `generate_stats` on panels if they haven't
already been called.
"""
import threading
import time

import debug_panel
from django.urls import reverse
from debug_panel.cache import cache
from debug_panel.middleware import DebugPanelMiddleware


class DebugPanelMiddlewareFixed(DebugPanelMiddleware):
    def process_response(self, request, response):
        """
        Store the DebugToolbarMiddleware rendered toolbar into a cache store.

        The data stored in the cache are then reachable from an URL that is appened
        to the HTTP response header under the 'X-debug-data-url' key.
        """
        toolbar = self.__class__.debug_toolbars.get(threading.current_thread().ident, None)

        response = super(DebugPanelMiddleware, self).process_response(request, response)

        if toolbar:
            # for django-debug-toolbar >= 1.4
            for panel in reversed(toolbar.enabled_panels):
                if hasattr(panel, 'generate_stats') and not panel.get_stats():  # PATCH HERE
                    panel.generate_stats(request, response)

            cache_key = "%f" % time.time()
            cache.set(cache_key, toolbar.render_toolbar())

            response['X-debug-data-url'] = request.build_absolute_uri(
                reverse('debug_data', urlconf=debug_panel.urls, kwargs={'cache_key': cache_key}))

        return response
