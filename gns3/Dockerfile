FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y software-properties-common && \
    add-apt-repository -y ppa:gns3/ppa && \
    apt-get update && \
    apt-get install -y gns3-server gns3-webclient-pack && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY gns3_server.conf /root/.config/GNS3/

EXPOSE 3080

CMD ["gns3server", "--host", "0.0.0.0", "--port", "3080"]
