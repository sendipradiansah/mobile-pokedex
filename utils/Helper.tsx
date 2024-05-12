export const getColor = (name: string) => {
    let color = '';

    switch(name){
      case 'normal':
        color = '#3399ff';
        break;
      case 'fighting':
        color = '#00ff99';
        break;
      case 'flying':
        color = 'orange';
        break;
      case 'poison':
        color = 'purple';
        break;
      case 'ground':
        color = 'gray';
        break;
      case 'rock':
        color = '#0000ff';
        break;
      case 'bug':
        color = 'fuchsia';
        break;
      case 'ghost':
        color = '#5c5c8a';
        break;
      case 'steel':
        color = 'silver';
        break;
      case 'fire':
        color = 'red';
        break;
      case 'water':
        color = 'cyan';
        break;
      case 'grass':
        color = 'green';
        break;
      case 'electric':
        color = 'aqua';
        break;
      case 'psychic':
        color = 'lime';
        break;
      case 'ice':
        color = 'teal';
        break;
      case 'dragon':
        color = 'maroon';
        break;
      case 'dark':
        color = '#334d4d';
        break;
      case 'fairy':
        color = 'pink';
        break;
      case 'unknown':
        color = '#336699';
        break;
      case 'shadow':
        color = '#7575a3';
        break;
      default: 
        color = '#993399';
    }
  return color;
}

export const formatNumber = (num: number) => {
    return num.toString().padStart(3, '0');
};