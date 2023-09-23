

# import requests

# # Make sure the URL is correct, it should be 'rooms' not 'room'
# url = 'http://localhost:3000/room'

# body = {
#     'name': 'test',
#     'password': 'test',
#     'admin_wallet': '0x1234567890123456789012345678901234567890',
# }

# r = requests.post(url, json=body)

# print(r.text)  # Prints the response body


# import requests

# # Make sure the URL is correct, it should be 'rooms' not 'room'
# url = 'http://localhost:3000/room/1/member'

# body = {
#     'address': '0x1234567890123456789012345678901234567820',
# }

# r = requests.post(url, json=body)

# print(r.text)  # Prints the response body


# # Make sure the URL is correct, it should be 'rooms' not 'room'
# url = 'http://localhost:3000/room/1'

# r = requests.get(url)

# print(r.text)  # Prints the response body


# import requests

# url = 'http://localhost:3000/distribution'

# body = {
#     'roomId': '1',
#     'amount': 100
# }

# r = requests.post(url, json=body)

# print(r.text)  # Prints the response body


# import requests

# url = 'http://localhost:3000/room/password/:password/'


# r = requests.get(url,)

# print(r.text)  # Prints the response body
