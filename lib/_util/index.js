export function getOffset(dom){
  function getParent(dom, offsetTop = 0, offsetLeft = 0){
    if(dom.offsetParent){
      offsetTop += dom.offsetParent.offsetTop;
      offsetLeft += dom.offsetParent.offsetLeft;
      getParent(dom.offsetParent, offsetTop, offsetLeft);
    }
    return {offsetTop, offsetLeft};
  }
  return getParent(dom, dom.offsetTop, dom.offsetLeft);
}