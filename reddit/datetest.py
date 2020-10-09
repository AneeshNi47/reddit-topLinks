from datetime import datetime
#ts = int("")

# if you encounter a "year is out of range" error the timestamp
# may be in milliseconds, try `ts /= 1000` in that case
print(datetime.utcfromtimestamp(1201309776).strftime('%Y-%m-%d'))
