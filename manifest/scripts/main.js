window.onload = () => {
  const select = document.querySelector('select');
};

function uuid(){
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(a) {
    let r = (new Date().getTime() + Math.random() * 16)%16 | 0, v = a == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

function geneManifest() {
  const textarea = document.getElementById('manifest');
  const maniTemp = {
    format_version: 2,
    header: {
      name: maniName.value || 'None',
      description: maniDesc.value || '',
      version: '<repVer>',
      uuid: uuid()
    },
    modules: [
      {
        type: maniType.value,
        description: maniDesc.value || '',
        version: '<repVer>',
        uuid: uuid()
      }
    ]
  };
  if((maniMinVer1.value != '')
  || (maniMinVer2.value != '')
  || (maniMinVer3.value != '')) {
    maniTemp.header.min_engine_version = '<repMinVer>';
  }
  if(maniType.value === 'script') {
    maniTemp.modules[0].language = 'javascript';
    maniTemp.modules[0].entry = `scripts/${maniEntry.value.replace(/\.js$/,'') || 'main'}.js`;
    maniTemp.dependencies = [];
    if(maniDepeGame.checked) maniTemp.dependencies.push({ "module_name": "@minecraft/server-gametest", "version": "1.0.0-beta" });
    if(maniDepeMine.checked) maniTemp.dependencies.push({ "module_name": "@minecraft/server", "version": "1.4.0-beta" });
    if(maniDepeMineUi.checked) maniTemp.dependencies.push({ "module_name": "@minecraft/server-ui", "version": "1.2.0-beta" });
  }
  textarea.value = JSON.stringify(maniTemp, null, 2).replace(/"<rep(Min|Game)?Ver>"/g, function(data) {
    return data === '"<repVer>"' ? '[ 1, 0, 0 ]' :
      data === '"<repMinVer>"' ? `[ ${maniMinVer1.value || 1}, ${maniMinVer2.value || 0}, ${maniMinVer3.value || 0} ]`:
      maniMineVer.value === 'normal' ? '"1.0.0"' : '"1.0.0-beta"';
  });
};

function geneUUID() {
  uuid_1.value = uuid();
  uuid_2.value = uuid();
};

function copy(data) {
  data.select();
  document.execCommand("Copy");
};