import os
import logging

LOGLEVEL = os.environ.get('LOGLEVEL', 'INFO').upper()

if len(logging.getLogger().handlers) > 0:
    logging.getLogger().setLevel(LOGLEVEL)
else:
    logging.basicConfig(level=LOGLEVEL)
