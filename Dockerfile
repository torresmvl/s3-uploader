FROM alpine:3.13 as base

RUN apk --update add \
    --no-cache \
    tini \
    nodejs \
    yarn

RUN yarn global add pm2

WORKDIR /api
COPY package.json package.json
RUN yarn

COPY . .

ENTRYPOINT [ "/sbin/tini", "--" ]
CMD [ "pm2-runtime", "src/app.js", "-i", "max" ]