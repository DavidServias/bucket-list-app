export default function calculateIconColor(profileName) {
    const hashCode = (str) => { 
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
         hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return hash;
    };

    const intToRGB = (i) => {
      var c = (i & 0x00FFFFFF)
          .toString(16)
          .toUpperCase();
    
      return "00000".substring(0, 6 - c.length) + c;
    };

    let iconColor = intToRGB(hashCode(profileName) );
    iconColor = "#" + iconColor;
    
    return iconColor;
  
}

