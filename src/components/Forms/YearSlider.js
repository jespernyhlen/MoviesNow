import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import { SliderRail, Handle, Track, Tick } from './sliders';
import { resetFilters } from '../../actions';

class YearSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            domain: [1980, 2020],
            values: this.props.filters.yearFilter.length
                ? this.props.filters.yearFilter
                : [1980, 2020],
        };
    }

    onUpdate = (values) => {
        this.setState({ values });
    };

    componentDidUpdate(prevProps) {
        if (this.props.resetFilterActive) {
            this.setState({
                values: [1980, 2020],
            });
            this.props.resetFilters(false);
        }
    }

    render() {
        const {
            state: { domain, values, reversed },
        } = this;
        return (
            <React.Fragment>
                <SliderContainer id='yearslider'>
                    {' '}
                    <LabelContainer>
                        <label>Year</label>
                    </LabelContainer>
                    <FormLabel>
                        <p>Min: {this.state.values[0]}</p>
                        <p>Max: {this.state.values[1]}</p>
                    </FormLabel>
                    <Slider
                        mode={2}
                        step={1}
                        domain={domain}
                        reversed={reversed}
                        rootStyle={sliderStyle}
                        onUpdate={this.onUpdate}
                        onChange={(e) => this.props.onChange(e, 'yearFilter')}
                        values={values}
                    >
                        <Rail>
                            {({ getRailProps }) => (
                                <SliderRail getRailProps={getRailProps} />
                            )}
                        </Rail>
                        <Handles>
                            {({ handles, getHandleProps }) => (
                                <div className='slider-handles'>
                                    {handles.map((handle) => (
                                        <Handle
                                            key={handle.id}
                                            handle={handle}
                                            domain={domain}
                                            getHandleProps={getHandleProps}
                                        />
                                    ))}
                                </div>
                            )}
                        </Handles>
                        <Tracks left={false} right={false}>
                            {({ tracks, getTrackProps }) => (
                                <div className='slider-tracks'>
                                    {tracks.map(({ id, source, target }) => (
                                        <Track
                                            key={id}
                                            source={source}
                                            target={target}
                                            getTrackProps={getTrackProps}
                                        />
                                    ))}
                                </div>
                            )}
                        </Tracks>
                        <Ticks count={10}>
                            {({ ticks }) => (
                                <div className='slider-ticks'>
                                    {ticks.map((tick) => (
                                        <Tick
                                            key={tick.id}
                                            tick={tick}
                                            count={ticks.length}
                                        />
                                    ))}
                                </div>
                            )}
                        </Ticks>
                    </Slider>
                </SliderContainer>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    filters: state.filter.filters,
    resetFilterActive: state.filter.resetFilters,
});

export default withRouter(
    connect(mapStateToProps, { resetFilters })(YearSlider)
);

const sliderStyle = {
    position: 'relative',
    width: '100%',
    margin: '1em auto 0',
};

const LabelContainer = styled.div`
    color: #ccc;
    font-weight: 600;
    font-size: 1.6em;
    @media only screen and (max-width: 800px) {
        font-size: 1.4em !important;
    }
`;

const FormLabel = styled.div`
    display: flex;
    justify-content: space-around;
    color: #ccc;
    font-size: 1.3em;
    height: 1.8em;
`;

const SliderContainer = styled.div`
    height: 100px;
    width: 100%;
    max-width: 700px;
    margin: 5em auto !important;

    @media only screen and (max-width: 800px) {
        width: 85% !important;
        margin: 5em auto 2em !important;
    }
`;
