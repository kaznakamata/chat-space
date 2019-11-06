## commentsテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user|references|null: false , foreign_key: true|
|group|references|null: false , foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_name|string|null: false, unique: true|
|mail|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :comments
- has_many :users_groups
- has_many :groups through: :users_groups

## users_groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false , foreign_key: true|
|group|references|null: false , foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, unique: true|

### Association
- has_many :users through: :users_groups
- has_many :users_groups
- has_many :comments

# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
