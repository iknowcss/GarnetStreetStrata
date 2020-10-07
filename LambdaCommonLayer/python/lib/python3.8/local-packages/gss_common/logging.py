import os
import logging
from pythonjsonlogger import jsonlogger

LOGLEVEL = os.environ.get('LOGLEVEL', 'INFO').upper()

root_logger = logging.getLogger()
if len(root_logger.handlers) > 0:
    root_logger.setLevel(LOGLEVEL)
    root_logger.removeHandler(root_logger.handlers[0])
    json_handler = logging.StreamHandler()
    formatter = jsonlogger.JsonFormatter(fmt='%(asctime)s %(levelname)s %(name)s %(message)s')
    json_handler.setFormatter(formatter)
    root_logger.addHandler(json_handler)
else:
    logging.basicConfig(level=LOGLEVEL)


def get_common_logger(name):
    return logging.getLogger(name)
