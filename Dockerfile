FROM ruby:2.5.1

# 必要なパッケージのインストール（基本的に必要になってくるものだと思うので削らないこと）
RUN apt-get update -qq && \
    apt-get install -y build-essential \ 
                       libpq-dev \        
                       nodejs           

# RAILS_ENV をあと差しできるようにしています
ARG RAILS_ENV

# あと差しした RAILS_ENV を環境変数に設定します
ENV RAILS_ENV ${RAILS_ENV}


# 作業ディレクトリの作成、設定
RUN mkdir /SubscripsApp 
##作業ディレクトリ名をAPP_ROOTに割り当てて、以下$APP_ROOTで参照
ENV APP_ROOT /SubscripsApp 
WORKDIR $APP_ROOT

# ホスト側（ローカル）のGemfileを追加する（ローカルのGemfileは【３】で作成）
ADD ./Gemfile $APP_ROOT/Gemfile
ADD ./Gemfile.lock $APP_ROOT/Gemfile.lock

# Gemfileのbundle install
RUN bundle install
ADD . $APP_ROOT
