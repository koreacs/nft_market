import contracts from '../constants/contracts';

function getMainWidth() {
  let SIDBAR: any = document.querySelector(
    '.navbar-vertical.navbar-expand-xs.fixed-left'
  );
  // @ts-ignore
  if (getWidth() > 1200) {
    SIDBAR.style.left = '0px';
  }
}

const handleTitle = (title: any) => {
  document.title = title;
  let SIDBAR: any = document.querySelector(
    '.navbar-vertical.navbar-expand-xs.fixed-left'
  );

  if (document.title === title) {
    SIDBAR.style.left = '-400px';
  } else {
    SIDBAR.style.left = '0px';
  }
};

function getWidth() {
  if (document.documentElement && document.documentElement.clientWidth) {
    return document.documentElement.clientWidth;
  }

  if (document.body) {
    return document.body.clientWidth;
  }
}

const hideShowSidebar = () => {
  let HideShow = false;
  let SIDBAR: any = document.querySelector(
    '.navbar-vertical.navbar-expand-xs.fixed-left'
  );
  // @ts-ignore
  if (getWidth() < 1200) {
    if (HideShow) {
      HideShow = false;
      SIDBAR.style.left = '0px';
    } else {
      HideShow = true;
      SIDBAR.style.left = '270px';
      SIDBAR.style.backgroundColor = '#fff';
    }
  }
};

const closeSidebar = () => {
  let SIDBAR: any = document.querySelector(
    '.navbar-vertical.navbar-expand-xs.fixed-left'
  );

  // @ts-ignore
  if (getWidth() < 1200) {
    SIDBAR.style.left = '0px';
  }
};

const getTokenInfo = async (id: number) => {
  try {
    const hash = await contracts.nftContract.methods.tokenURI(id).call();

    const response = await fetch(`https://ipfs.infura.io/ipfs/${hash}?clear`);
    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const metadata = await response.json();
    const isApproved = await contracts.nftContract.methods
      .getApproved(id)
      .call();
    const owner = await contracts.nftContract.methods.ownerOf(id).call();

    return {
      id,
      title: metadata.properties.name.description,
      description: metadata.properties.description.description,
      category: metadata.properties.category
        ? metadata.properties.category.description
        : 1,
      img: `https://ipfs.infura.io/ipfs/${metadata.properties.image.description}`,
      isApproved,
      owner,
    };
  } catch (_) {
    return;
  }
};

export {
  getMainWidth,
  handleTitle,
  getWidth,
  hideShowSidebar,
  closeSidebar,
  getTokenInfo,
};
