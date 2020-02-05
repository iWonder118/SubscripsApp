# README
## 本システムの概要 (v0.1)
   本システムはサブスクリプションサービスに特化した家計簿アプリです。  
   現在利用しているサービスをまとめることがき、利用数や当月の合計利用料金などを算出することができます。  
   そして、サービスごとに公開設定があり有効にすれば利用ユーザーの支払い情報を除く、詳細をリンクで共有できます。  
   転職活動用のポートフォリオとして作成しました。  
   現段階では、まだサービスのコア部分ができたところなので質素な作りになっております。  
   > 2020/01/23 現在　　
   
## なぜ作ったのか
   昨今、それほど高くない価格に対して多くの価値を提供しているサブスクリプションサービスが増えてきました。  
   私もそのコストパーフォーマンスの恩恵を受けいている一人ですがいかんせんその実感が最初の1〜2ヶ月だけなような気がします。  
   そして解約しずにほったらかしてきたサービスも思い返せばチラホラとあります。  
   そんな、忘れてしまいやすいサブスクリプションサービスを管理すために、サブスクリプションサービスに特化した家計簿アプリがあればいいなと思い作成しました。  
   通常の家計簿アプリで管理するのもよいのですがどうしても全ての支払をまとめていくうちにいろいろな情報に埋もれてしまいがちなので、サブスクリプションサービスだけ西堀今回作成しました。  
 
 ## 工夫した点
   1.CRUD操作の非同期化  
     →jQuery側のAjaxでCRUD操作ができるようにしました。　　
     
   2.Docker,Circle CIでのCI/CD,Terraformでのインフラのコード化
     →最近の実務で使用されている環境にキャッチアップすべく導入しました。
   
   3.非同期でのドラッグアンドドロップでのソート  
     →jQuery-uiライブラリとranked-modelというGemでドラッグアンドドロップでソートができるようにしました。
 
 ## 実装機能
 - サービスの登録機能
 - サービスの削除機能
 - サービスの編集機能
 - サービスの共有機能
 - サービスの詳細機能
 - サービスのソート機能
 - 毎月の支払金額算出機能
 - サービスの登録数機能
 - ユーザー新規登録機能
 - ログイン機能
 - ログアウト機能
 - テストユーザー
 
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
