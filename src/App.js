import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      htmlContent: null,
    };
  }

  componentDidMount() {
    // Fetch the index.html content and set it in the state
    fetch('/path/to/index.html') // Replace with the actual path to your index.html
      .then((response) => response.text())
      .then((htmlContent) => {
        this.setState({ htmlContent });
      })
      .catch((error) => console.error('Error loading index.html', error));
  }

  render() {
    const { htmlContent } = this.state;

    return (
      <div>
        {htmlContent && (
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        )}
      </div>
    );
  }
}

export default App;
