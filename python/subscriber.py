import redis

print ("Redis Subscriber")

r = redis.Redis(host='localhost', port=6379, db=0)

def sub():
    pubsub = r.pubsub()
    pubsub.subscribe("test")
	message = pubsub.get_message()
	if message:
		print(message)

if __name__ == "__main__":
    sub()
		