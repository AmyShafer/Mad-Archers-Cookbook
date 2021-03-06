window.onload = function() {
  let ps = placeSearch({
    key: '4EIp75cIJxshpnY02ZKqnaRuIRfessKV',
    container: document.querySelector('#map-search-input'),
    useDeviceLocation: true,
    collection: [
      'adminArea',
      'category',
      'franchise'
    ],
  });

  L.mapquest.key = '4EIp75cIJxshpnY02ZKqnaRuIRfessKV';
  

  var map = L.mapquest.map('map', {
    center: [39.9526,  -75.1652],
    layers: L.mapquest.tileLayer('map'),
    zoom: 12
  });

  L.mapquest.control().addTo(map);

  let searchLayer = null;

  ps.on('change', (e) => {

    if (e.result.type === 'franchise' || e.result.type === 'category') {
      let search = L.mapquest.search();
      search.place({
        category: `sic:${e.result.sic[0]}`,
        sort: 'relevance',
        bbox: map.getBounds(),
        pageSize: 20
      }, handleSearch);
    }
  });

  function handleSearch(err, data) {
    if (searchLayer) {
      map.removeLayer(searchLayer);
    }

    searchLayer = L.mapquest.searchLayer({
      searchResponse: data
    });
    map.addLayer(searchLayer);
  }

  ps.on('clear', () => {
    if (searchLayer) {
      map.removeLayer(searchLayer);
    }
    searchLayer = null;
    map.setView(new L.LatLng(39.50,  -98.35), 5);
  });

  ps.on('error', (e) => {
    console.log(e);
  });
}
