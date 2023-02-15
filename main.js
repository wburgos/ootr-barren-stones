function shuffleLocations(rewards, rewardsLocations) {
  const shuffledRewards = rewards.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  const locations = {
    'Links Pocket': 'Kokiri Emerald'
  };
  rewardsLocations.forEach((rewardLocation, i) => {
    locations[rewardLocation] = shuffledRewards[i];
  });
  return locations;
}

function getStoneDungeons(locations, dungeons) {
  return Object.keys(locations).map((location) => {
    if (['Goron Ruby', 'Zora Sapphire'].includes(locations[location])) {
      return dungeons[location];
    }
  }).filter(value => value);
}

fetch('data.json')
  .then(response => response.json())
  .then((data) => {
    const { template, rewards, rewardsLocations, dungeons } = data;

    template.locations = shuffleLocations(rewards, rewardsLocations);
    template.settings.empty_dungeons_specific = getStoneDungeons(template.locations, dungeons);
    template.settings.user_message = 'S6 Barren Stones';

    // Generate the plando file
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(template));
    let dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "s6_barren_stones.json");
    document.getElementById('main-link').style = 'display: block';
  }).catch(err => {
    document.getElementById('main-link').style = 'display: block';
    document.getElementById('main-link').innerHTML = 'Uh oh, something went wrong. Try again?';
  });