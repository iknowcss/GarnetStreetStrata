import os
import logging
from pythonjsonlogger import jsonlogger

LOGLEVEL = os.environ.get('LOGLEVEL', 'INFO').upper()

if len(logging.getLogger().handlers) > 0:
    logging.getLogger().setLevel(LOGLEVEL)
else:
    logging.basicConfig(level=LOGLEVEL)

def get_common_logger(name):
    logger = logging.getLogger(name)
    json_handler = logging.StreamHandler()
    formatter = jsonlogger.JsonFormatter(
        fmt='%(asctime)s %(levelname)s %(name)s %(message)s'
    )
    json_handler.setFormatter(formatter)
    logger.addHandler(json_handler)
    return logger
