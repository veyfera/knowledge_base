def html_special_chars(text):
    return text \
    .replace(u"&", u"&amp;") \
    .replace(u'"', u"&quot;") \
    .replace(u"'", u"&#039;") \
    .replace(u"<", u"&lt;") \
    .replace(u">", u"&gt;")
