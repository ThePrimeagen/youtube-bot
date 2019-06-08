let init = false;

function createInitYT() {
    return new Promise((res, rej) => {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";

        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = function() {
            res();
        };
    });
}


function onPlayerReady(event) {
    event.target.playVideo();
}

function createVideo(elementId, videoId, callback) {
    let player;

    let state = null;

    function onPlayerStateChange(event) {
        switch (event.data) {
            case YT.PlayerState.UNSTARTED:
                if (state === YT.PlayerState.BUFFERING ||
                    state === YT.PlayerState.PLAYING) {
                    callback('stop');
                }
                break;
            case YT.PlayerState.ENDED:
                if (state === YT.PlayerState.PLAYING) {
                    callback('stop');
                }
                break;
        }
        state = event.data;
        console.log('event.data', event.data, YT.PlayerState);
    }

    function stopVideo() {
        player.stopVideo();
    }

    player = new YT.Player(elementId, {
        height: '390',
        width: '640',
        videoId: videoId,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });

}

export default async function createYouTubePlayer() {
    if (!init) {
        init = true;
        await createInitYT();
    }

    return createVideo;
};

