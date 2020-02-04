# README
## 本システムの概要 (v0.1)
   本システムはサブスクリプションサービスに特化した家計簿アプリです。  
   現在利用しているサービスをまとめることがき、利用数や当月の合計利用料金などを算出することができます。  
   そして、サービスごとに公開設定があり有効にすれば利用ユーザーの支払い情報を除く、詳細をリンクで共有できます。  
   転職活動用のポートフォリオとして作成しました。  
   現段階では、まだサービスのコア部分ができたところなので質素な作りになっております。  
   > 2020/01/23 現在
# 現在動作が不安定です。もし、503エラーが出た場合は20秒ほど時間を置いてページをリロードしてみてください
問題は[こちら](https://github.com/iWonder118/SubscripsApp/issues/20)のissueにまとめてあります。  

## 使用技術
- システム環境(動作確認環境)
  - インフラ図  
    ![subscrips_aws](https://user-images.githubusercontent.com/52240372/72513678-a8672700-3890-11ea-8870-90862e4f4fa0.png)  
  - AWS
    - EC2  
      ami  : `ami-0e37e42dff65024ae`  
      type : `t2.small`  
      
    - RDS  
      type : MySQL (v5.7.22)  
      
    - ECS  
    
    - ECR  
    
    - Routes 53  
    
    - ACM  
    
    - ELB(ALB)  
    
    - AWS CLI (v1.16.308)  
      > Python (v3.7.3) Darwin (v19.0.0) botocore (v1.13.44)  
      
  - Terraform (v0.12.18)  
    コードは[こちら](https://github.com/iWonder118/subscrips_terraform)のリポジトリにあります。  
    
  - Docker (v19.03.5)
    - Docker-compose (v1.24.1)  
    
    - DockerHub  
      WebhookによってGitHubのリモートリポジトリのMasterブランチへプッシュごとにコンテナのスナップショットを作成します。  
      
  - CircleCI  
    コードは[こちら](https://github.com/iWonder118/SubscripsApp/blob/master/.circleci/config.yml)から確認できます。  
    WebhookによってGitHubのリモートリポジトリへプッシュごとに自動テスト(CI)が実行されます。
    Masterブランチの場合、コンテナを自動ビルドをします。
    ビルド後、AWS CLIをインストールして使い、ECRへとプッシュとECSのサービスとタスク定義の更新を行います。(CD)  
    
  - Ruby (v2.5.1)  
  
  - RubyOnRails (v5.2.4.1)  
  
  - jQuery (v1.12.4)  
  
  - SCSS  
  
  - Haml  

- 本番環境
  - テストアカウント  
    mail: `test-boy@gmail.com`  
    passwrod: `password123`  
    
  [こちら](https://subscrips.com)よりログインして、確認することができます。  
  
##  実装予定
[こちら](https://github.com/iWonder118/SubscripsApp/issues/21)のissueにまとめてあります。
## DB設計
- ER図  
  ![subscrips DB](https://user-images.githubusercontent.com/52240372/72961725-6d677500-3df5-11ea-9afe-a3de8c450a56.png)
