function getPortalUrl() {
  var locationHref = window.location.href;
  var indexOfPortal = locationHref.indexOf('/portal/');
  if (indexOfPortal >= 0) {
    return locationHref.substring(0, indexOfPortal);
  } else {
    //in case of a layout instead of a page/form, the servlet mapping is /apps/* instead of /portal/*
    var indexOfApps = locationHref.indexOf('/apps/');
    if (indexOfApps >= 0) {
      return locationHref.substring(0, indexOfApps);
    } else {
      //Make the link work in case we are in the preview and the target process is deployed in the portal
      return '/bonita';
    }
  }
}

