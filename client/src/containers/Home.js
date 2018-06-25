import React, {Component} from "react";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import API from "../utils/API";

class Home extends Component {
  constructor(props, context) {
    super(props, context);

  this.state = {
    articles: [],
    q: "",
    begin_date: undefined,
    end_date: undefined,
    isDisabled: false,
  }
  this.handleBeginDayChange = this.handleBeginDayChange.bind(this);
  this.handleEndDayChange = this.handleEndDayChange.bind(this);

}



handleBeginDayChange(selectedDay, modifiers) {
  this.setState({
    begin_date: selectedDay,
    isDisabled: modifiers.disabled === true
  });
};

handleEndDayChange(selectedDay, modifiers) {
  this.setState({
    end_date: selectedDay,
    isDisabled: modifiers.disabled === true
  });
};


  handleOnChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }



  articleSearch = event => {
    event.preventDefault();
    var params = {
      q: this.state.q
    }
    if (this.state.begin_date){ 
      params.begin_date = this.state.begin_date; 
    }
    if(this.state.end_date){
      params.end_date = this.state.end_date;
     } 
    API.nytSearch(params).then(res => {
      console.log(res.data);
      this.setState({
        articles: res.data.response.docs,
        q: "",
        begin_date: "",
        end_date: ""

      })
    })
    .catch(err => console.log(err))
  }

  saveArticle = id => {
    const savedArticle = this.state.articles.find(article => (article._id === id));

    console.log(savedArticle);
    API.articleSave({
      title: savedArticle.headline.main,
      url: savedArticle.web_url,
      date: savedArticle.pub_date || ""
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  render() {
    const { q, begin_date, end_date, isDisabled } = this.state;
    return (
      <div>
        <div className="jumbotron jumbotron-fluid py-1 bg-info">
          <div className="row align-items-center justify-content-center my-5">
            <h1>Welcome to the NY Times Article Search (with React)!</h1>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">

            {/* Form for article search */}
            <div className="col-4">
              <h2>Search for Articles</h2>
              <form>
                <div className="form-group">
                  <input
                    name="q"
                    value={this.state.q}
                    placeholder="Search for an article topic"
                    type="text"
                    onChange={this.handleOnChange}
                    className="form-control mb-2"/>
      
     
                    <div className="form-control mb-2">
                    <p>Optional begin day:</p>
                    <DayPickerInput value={begin_date} onDayChange={this.handleBeginDayChange} />
                  </div>
                    <div className="form-control mb-2">
                    <p>Optional end day:</p>
                    <DayPickerInput value={end_date} onDayChange={this.handleEndDayChange} />
                  </div>
                    

                  <button type="submit" className="btn btn-block btn-success" onClick={this.articleSearch}>
                    Submit
                  </button>
                </div>
              </form>
            </div>

            {/* Article result container */}
            <div className="col-8">
              <h2>{this.state.articles.length
                  ? "Article Results"
                  : "Search for some articles"}
              </h2>

              <ul className="list-group list-group-flush">
                {this
                  .state
                  .articles
                  .map(article => (
                    <li key={article._id} className="list-group-item d-flex justify-content-between align-items-center">
                      {article.headline.main}
                      <span
                        className="badge badge-primary badge-pill"
                        onClick={() => this.saveArticle(article._id)}>Save Article</span>
                    </li>
                  ))}
              </ul>
            </div>

          </div>
        </div>

      </div>
    )
  }
}

export default Home;