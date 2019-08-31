import sys
sys.path.append("/opt")
import os
from pynamodb.attributes import UnicodeAttribute, UTCDateTimeAttribute
from pynamodb.models import Model
from pynamodb.indexes import GlobalSecondaryIndex, KeysOnlyProjection



STAGE = os.environ.get('STAGE', 'local')
is_local = STAGE == 'local'


class ChartIndex(GlobalSecondaryIndex):
    class Meta:
        # index_name is optional, but can be provided to override the default name
        index_name = 'chartIndex'
        read_capacity_units = 1
        write_capacity_units = 1
        # All attributes are projected
        projection = KeysOnlyProjection()

    # This attribute is the hash key for the index
    # Note that this attribute must also exist in the model
    chart = UnicodeAttribute(hash_key=True)

class SessionDB(Model):
    class Meta:
        table_name = f"{STAGE}_session_db"
        region = os.environ.get("AWS_REGION", 'ap-northeast-2')
        if is_local:
            host = "http://localhost:8888"

    connection_id = UnicodeAttribute(hash_key=True)
    chart = UnicodeAttribute(null=True)
    createdAt = UTCDateTimeAttribute()