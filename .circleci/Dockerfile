FROM circleci/node:10.1.0

ENV WATCHMAN_VERSION 4.9.0
ENV PATH=$PATH:/home/circleci/.config/yarn/global/node_modules/.bin

RUN set -ex; \
  sudo apt-get update; \
  sudo apt-get install -y autoconf automake build-essential python-dev libtool libssl-dev; \
  cd /tmp && curl -LO https://github.com/facebook/watchman/archive/v${WATCHMAN_VERSION}.tar.gz; \
  tar xzf v${WATCHMAN_VERSION}.tar.gz && rm v${WATCHMAN_VERSION}.tar.gz; \
  cd watchman-${WATCHMAN_VERSION}; \
  ./autogen.sh; ./configure; make; sudo make install; \
  cd /tmp && sudo rm -rf watchman-${WATCHMAN_VERSION}; \
  yarn global add firebase-tools --cache-folder /tmp/.cache; \
  rm -rf /tmp/.cache;
