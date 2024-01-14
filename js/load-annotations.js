jQuery('main').annotator().annotator('addPlugin', 'Offline', {
  setAnnotationData: (ann) => {
    ann.uri = window.location.href;
  },
  shouldLoadAnnotation: (ann) => ann.uri == window.location.href,
});
