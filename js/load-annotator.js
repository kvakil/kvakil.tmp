(function() {
    if (window.location.search !== '?annotate') return;

    [
        "/assets/annotate/jquery-3.6.0.min.js",
        "/assets/annotate/annotator.min.js",
        "/assets/annotate/annotator.offline.min.js",
        "/js/load-annotations.js"
    ].forEach((src) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.async = false;
        document.body.appendChild(script);
    });

    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = '/assets/annotate/annotator.min.css';
    document.body.appendChild(style);
})()
