from gss_common.distribution_list_entry import DistributionListEntry, parse_value, \
    DESTINATION_ADDRESS_SMS_AU, ADDRESS_TYPE_PATTER


def parse_delete_request(event):
    path_parts = event.get('pathParameters', {}).get('proxy', '').split('/')
    if len(path_parts) < 2:
        return None
    destination_address = parse_value(DESTINATION_ADDRESS_SMS_AU, path_parts[1])
    address_type = parse_value(ADDRESS_TYPE_PATTER, path_parts[0].upper())

    if destination_address and address_type:
        return DistributionListEntry(destination_address, address_type)
    return None
