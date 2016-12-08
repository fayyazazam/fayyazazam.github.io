/**
 * Created by fayyaz on 2016-12-03.
 */
import Component from 'react/lib/ReactComponent';
import Grid from 'react-bootstrap/lib/Grid';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import PostcssJS from 'postcss-js';
import AutoPrefixer from 'autoprefixer';

// Need this prefixer so I can get inline styling to be prefixed as well
var Prefixer = PostcssJS.sync([AutoPrefixer]);

export default class JumboT extends Component {
    constructor(props) {
        {/** We want to show our blurred image in the beginning, so work with states **/}
        super(props);
        this.state = {
            imageURL: this.getTimeOfDaySVG(),
            opacity: 1,
            filter: 'blur(20px)',
            transition: '1s filter',
            transform: null
        };
    }

    handleImageLoaded() {
        {/** Handle jumbotron image to load and the transition when it IS in fact loaded **/}
        this.setState({
            imageURL: this.getTimeOfDayImg(),
            opacity: 0.95,
            filter: 'blur(0px)',
            transition: '1s filter',
            transform: 'translate3d(0, 0, 0)'
        });
    }

    jumbotronImageStyle() {
        {/** Handle the styling of the jumbotron image **/}
        return {
            backgroundImage: 'url(' + this.state.imageURL + ')',
            opacity: this.state.opacity,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            filter: this.state.filter,
            transition: this.state.transition,
            transform: this.state.transform
        }
    }

    getTimeofDay() {
        {/** Get the current time of the user to determine appropriate greeting **/}
        var now = new Date();
        var hour = now.getHours();

        //24-hour hour format
        if(hour > 3 && hour < 12) {
            return "Morning";
        }
        if(hour >= 12 && hour < 17) {
            return "Afternoon";
        }
        else {
            return "Evening";
        }
    }

    getTimeOfDaySVG() {
        switch(this.getTimeofDay()) {
            case 'Morning':
                return 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%0A%20%20%20%20%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%0A%20%20%20%20%20width%3D%223264%22%20height%3D%222448%22%0A%20%20%20%20%20viewBox%3D%220%200%203264%202448%22%3E%0A%20%20%3Cfilter%20id%3D%22blur%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2220%2020%22%20edgeMode%3D%22duplicate%22%20/%3E%0A%20%20%20%20%3CfeComponentTransfer%3E%0A%20%20%20%20%20%20%3CfeFuncA%20type%3D%22discrete%22%20tableValues%3D%221%201%22%20/%3E%0A%20%20%20%20%3C/feComponentTransfer%3E%0A%20%20%3C/filter%3E%0A%20%20%3Cimage%20filter%3D%22url%28%23blur%29%22%0A%20%20%20%20%20%20%20%20%20xlink%3Ahref%3D%22data%3Aimage/jpeg%3Bbase64%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%22%0A%20%20%20%20%20%20%20%20%20x%3D%220%22%20y%3D%220%22%0A%20%20%20%20%20%20%20%20%20height%3D%22100%25%22%20width%3D%22100%25%22/%3E%0A%3C/svg%3E';
            case 'Afternoon':
                return 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%0A%20%20%20%20%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%0A%20%20%20%20%20width%3D%222000%22%20height%3D%221125%22%0A%20%20%20%20%20viewBox%3D%220%200%202000%201125%22%3E%0A%20%20%3Cfilter%20id%3D%22blur%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2220%2020%22%20edgeMode%3D%22duplicate%22%20/%3E%0A%20%20%20%20%3CfeComponentTransfer%3E%0A%20%20%20%20%20%20%3CfeFuncA%20type%3D%22discrete%22%20tableValues%3D%221%201%22%20/%3E%0A%20%20%20%20%3C/feComponentTransfer%3E%0A%20%20%3C/filter%3E%0A%20%20%3Cimage%20filter%3D%22url%28%23blur%29%22%0A%20%20%20%20%20%20%20%20%20xlink%3Ahref%3D%22data%3Aimage/jpeg%3Bbase64%2C/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAICAgICAQICAgIDAgIDAwYEAwMDAwcFBQQGCAcJCAgHCAgJCg0LCQoMCggICw8LDA0ODg8OCQsQERAOEQ0ODg7/2wBDAQIDAwMDAwcEBAcOCQgJDg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg7/wgARCAAXACgDAREAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAABQYHCAn/xAAYAQADAQEAAAAAAAAAAAAAAAAEBQYDAv/aAAwDAQACEAMQAAAA50IXpjnsKViSGIUSgS8rR0FSxv020zxUq1RgBmmxmTWG1qQNoc9UKZgv/8QAMBAAAQMDBAACCAcBAAAAAAAAAgEDBAUGEQAHEiETIxQVIjEyUnGiCEFCQ3KBobP/2gAIAQEAAT8ApGzdemw2X/Go5MufC4FVQkH5SXrKZ/LrS7OXRBozlQC3nqnG/a9CkA6ri+5EQRVS7+mj2l37ZuKP4u1lcGJNAxjNFSJCR8CmeROEAgOB+ckRV6TK6mWFcMcCpc2gyvWgh5zYR1ERX+841PtivI0fOG+fHrgLnNf44TOot6Xy/QGQZvD1Si/EsOmsIv3oWqduBuh6PBKHuc9TpItKCSmoEdHlyCjnlxVRXvOUx3hdXdc+9DeysIJ34kLkn8zJ3OYyljgnlKKAgKGVz2irlE70/uVuGxVpTb25b9Rzleciix8/TIiK4+udVLdW8gZkZuKnESn7J+qcL/11FuSosRmgdMTHh7PlpqDecsTYwS+X7sgmri3SmS7Ip7fg82zBVFzmveETrHX+6qN1SXfEkkh9/p56euQ3c8k+8tf/xAAtEQAABAQCBwkAAAAAAAAAAAAAAgMEAQUSExFSFBUhIjFykjIzUXGCkaHi8P/aAAgBAgEBPwA02QJwqGuG1duun4GuJVa72HUXH95AszRPG4mfd5gV6nnBmLS5sJXzHMFGMuhcrSqjlrNgEU2cXULbUuHhve/b4iDJjb2o0eowLLWmQ/V9RoiQMzTCUvIQ+AI3xFkf/8QAJBEAAQMDBAEFAAAAAAAAAAAAAAEDBAITFAURIVMVIiNRYdH/2gAIAQMBAT8Ao0948XV1CwZbsje0Oae5Uli0Y8gyZXaUS5/YONPtUKuRz8+j8K5crn3Bya4XPoyFK5zybqOSS8f/2Q%3D%3D%22%0A%20%20%20%20%20%20%20%20%20x%3D%220%22%20y%3D%220%22%0A%20%20%20%20%20%20%20%20%20height%3D%22100%25%22%20width%3D%22100%25%22/%3E%0A%3C/svg%3E';
            case 'Evening':
                return 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%0A%20%20%20%20%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%0A%20%20%20%20%20width%3D%222200%22%20height%3D%221238%22%0A%20%20%20%20%20viewBox%3D%220%200%202200%201238%22%3E%0A%20%20%3Cfilter%20id%3D%22blur%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2220%2020%22%20edgeMode%3D%22duplicate%22%20/%3E%0A%20%20%20%20%3CfeComponentTransfer%3E%0A%20%20%20%20%20%20%3CfeFuncA%20type%3D%22discrete%22%20tableValues%3D%221%201%22%20/%3E%0A%20%20%20%20%3C/feComponentTransfer%3E%0A%20%20%3C/filter%3E%0A%20%20%3Cimage%20filter%3D%22url%28%23blur%29%22%0A%20%20%20%20%20%20%20%20%20xlink%3Ahref%3D%22data%3Aimage/jpeg%3Bbase64%2C/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wgARCAAXACgDAREAAhEBAxEB/8QAGgAAAgIDAAAAAAAAAAAAAAAABQYCBAMHCf/EABsBAAICAwEAAAAAAAAAAAAAAAQGAgMABQcB/9oADAMBAAIQAxAAAACFoyk0J9oa1jXWw+utXLDrnP2nT7y2CbhOXlomjTymxqBoYuuwdDBPsf/EACoQAAEDAwQBAwMFAAAAAAAAAAECAwQFBxEABhIhMQkTQQhRYSIyQqGi/9oACAEBAAE/AIHrAXeiCQa59NdZYaLZEF5EV5RCuwPcSUgDv7HVS9Z36loj7wRa2jsILoLQlUqWClA8gjn5JBOf45xqJ63N36Syt3dFnqQ+nIDb7L8iMn/aV6onrI3ClNIdq1gc8wChUOrjGPkn3EjH4B016qdxqlT1VKB9O8pbXwRuOGOvnlleQfxjQu5fNp9cuTdOptrZ+FViQAsfJSB+kgchn7DB8YzRr43nqO2WdwG4U2XDflKZQ85JYDa1IALicLAcykKTk+ATjlnrVOuVvmv081FdzKZGbSni+mu15qI005nvskqxg5HXgg6qnKkvyXK/eZ1qM2wp96VG3NEfj4BUOOC8Pt4wcDTN6tuPSnqHSLwVR91gjpuu0xpC1HHQUp7C/I8Z1crc+w6BZqHHp+5Hpe761LcmAoYebZjQOamm1p5ZCnHkhTmFE+0kpSMLGRKvhuCr0xLFdr011bdOEJLLZCGjHyVFkoSAkpUrtROSSSe+gKvdGVMXHLEb3PajoaW7JSCtSUn9gPZ44wOyScDOq9veXW4rkIxEtNFwKbSFZ4/0O85wfICiPk6ZqUmKecdYQUggYSOgfOv/xAAxEQABAgIHBQYHAAAAAAAAAAABAgMAEQQFEiExQWEGBxNRoRQXQlJxsSJic4KiweH/2gAIAQIBAT8A7tqrcCeDXSCfEJpw+UgmKPus2QWgWqwcJlfZW3jl4Th1h/dDUb6pUSs3E6EIX7WYpm62hoUQzW+Hmbz+1UObB0Rl/hOVyAfoudMjDCtlHKEVBDM5ysWPiOs7MvyEOjZ1DpSmjBKtLWvqMuUOVlVdHdKOzk8ihJUZX6S0xiiV/V9Lbm2wBLzIsn2hL1AdUSW255ztQlXEJAN0gJdeQlLPnA7OkAjG7L96ZQ26G52RcTP++sKWFyJF4whDriDMGP/EAC8RAAECBAQCCAcAAAAAAAAAAAECEQADBCEFBhJBMXEiMlFhYoGRoQcTQnOiscH/2gAIAQMBAT8ARmzGpZWZ+X56U/SQlZvfrApS0Vef87SVqbCEpDjTqRM6u4Nxc35PvCPihjFEgqrcIBHaCtA/JKow/PGIVCAqdgig/AiYPfUkNszxJxXEqimM6XgqyPvSffpOPSJ9Tn0VjmsnjfVrOn0Cm37LRTY7nlckFdaVDxJQxvcGwVw8QvCarNNSjX85PeFnSHfZlP6xXYTjdIsldYvpHgmYpSb7MXDQKnH5MsITUTvIpbz35PBmrRLAIuXPL9u/tAnVHDa+/wDO/eFmZNSHN2A4DZ7coQVJCgDYwUJWGMf/2Q%3D%3D%22%0A%20%20%20%20%20%20%20%20%20x%3D%220%22%20y%3D%220%22%0A%20%20%20%20%20%20%20%20%20height%3D%22100%25%22%20width%3D%22100%25%22/%3E%0A%3C/svg%3E';
        }
    }

    getTimeOfDayImg() {
        switch(this.getTimeofDay()) {
            case 'Morning':
                return './src/styles/images/Morning.jpg';
            case 'Afternoon':
                return './src/styles/images/Van-Afternoon.jpg';
            case 'Evening' :
                return './src/styles/images/Van-Evening.jpg';
        }
    }

    render() {
        return(
            <div>
                {/* Jumbotron and text on it */}
                <Jumbotron style={Prefixer(this.jumbotronImageStyle())}>
                    <Grid>
                        {/** We don't want to display this, just using as a loader for image
                         since we are using background image **/}
                        <img src={this.getTimeOfDayImg()}
                             style={Prefixer({display: 'none'})}
                             onLoad={this.handleImageLoaded.bind(this)}
                        />
                        <h2 id="Jumbo-Text">
                            Good {this.getTimeofDay()}!
                        </h2>
                        {this.getTimeofDay() == 'Afternoon' ?
                            <p id="Imgsrc">https://www.flickr.com/photos/clive_c/16015939925/</p>
                            :
                            <p id="Imgsrc">https://www.flickr.com/photos/sworldguy/15382980215/</p>
                        }
                    </Grid>
                </Jumbotron>
            </div>
        )
    };
}