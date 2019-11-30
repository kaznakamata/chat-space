json.body  @message.body
json.image @message.image.url
json.name @message.user.name
json.user_id  @message.user_id
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.id @message.id