chrome.action.onClicked.addListener((tab) => {
    if (!tab.url) return;
  
    const githubRegex = /^https:\/\/github\.com\/([^\/]+\/[^\/]+)/;
    const match = tab.url.match(githubRegex);
  
    if (match) {
      const repoPath = match[1];
      const newUrl = `https://gitdiagram.com/${repoPath}`;
      chrome.tabs.create({ url: newUrl });
    } else {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => alert("当前页面不是 GitHub 仓库页面。")
      });
    }
  });

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!tab.url) return;
  
    const isGithub = /^https:\/\/github\.com\/[^\/]+\/[^\/]+/.test(tab.url);
    chrome.action.setIcon({
      tabId: tabId,
      path: isGithub ? "icon.png" : "icon_gray.png"
    });
    chrome.action.setTitle({
      tabId: tabId,
      title: isGithub ? "Open in GitDiagram" : "仅支持 GitHub 仓库页面"
    });
  });
  
