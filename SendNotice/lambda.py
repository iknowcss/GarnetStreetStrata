import os

def handler(event, context):
    PINPOINT_PROJECT_ID = os.environ.get('PINPOINT_PROJECT_ID')
    print(PINPOINT_PROJECT_ID)
