
import './App.css';
import { Tab } from '@headlessui/react';
import Plot from 'react-plotly.js';
import global from "./data/all-weeks-global.json";
import top from "./data/most-popular.json";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function App() {

 let top = require('./data/most-popular.json')
let global = require('./data/all-weeks-global.json')
    const film_en = Object.values(top.filter(o=> o.category === 'Films (English)')).reduce((prev,curr) => prev + curr.hours_viewed_first_28_days, 0)
    const film_noen = top.filter(o=> o.category === 'Films (Non-English)').reduce((prev,curr) => prev + curr.hours_viewed_first_28_days, 0)
    const tv_en = Object.values(top.filter(o=> o.category === 'TV (English)')).reduce((prev,curr) => prev + curr.hours_viewed_first_28_days, 0)
    const tv_noen = top.filter(o=> o.category === 'TV (Non-English)').reduce((prev,curr) => prev + curr.hours_viewed_first_28_days, 0)
    return (
    <div className="App">
      <header className="App-header  bg-[url('../public/irland.jpg')] bg-no-repeat bg-cover  filter saturate-10">

        <img src="/netflix.png" className="object-scale-down w-1/3" alt="logo" />
        <div className="w-3/4">
        <p className=" text-4xl">
          A Data Visualization Project
        </p>
        <p className="mt-9 text-2xl">Netflix is one of the major movie producers and distributors in the world with millions of hours of content streamed weekly.
          In this project we will take a look at their data of most popular shows and movies.</p>
        <p className="text-xl pt-16">
            By: Alvaro Fragoso Carreras <br/>
        </p>
            <p className="text-xl mt-9">
                22.531 - Visualización de datos | UOC <br/>
            </p>
        </div>
      </header>
      <section className="bg-gray-200 w-full  px-2 py-16 sm:px-0 h-full ">
        <p className="text-red-600 text-3xl mb-10">Most popular Films & Shows</p>
        <Tab.Group>
            <div className="flex place-content-center">
          <Tab.List className="flex p-1 space-x-1 bg-gray-900/20 rounded-xl w-2/3 ">
              {top.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index).map(
                  (category) => (

                      <Tab
                          key={category}
                          className={({ selected }) =>
                              classNames(
                                  'w-full py-2.5 text-sm leading-5 font-medium text-red-700 rounded-lg',
                                  'focus:outline-none  ',
                                  selected
                                      ? 'bg-white shadow'
                                      : 'text-red-100 hover:bg-white/[0.12] hover:text-white'
                              )
                          }
                      >
                          {category}
                      </Tab>


                  )

              )}



          </Tab.List>
            </div>
            <div className="mt-16">
          <Tab.Panels>
              {top.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index).map(
                  (category, index) => {
                      const data = top.filter(o => o.category === category);

                      return <Tab.Panel>
                        <Plot key={index} data={[
                            {
                                x: data.map(o=> o.show_title),
                                y: data.map(o=> o.hours_viewed_first_28_days),
                                type : 'bar',
                                marker: {color: 'red'},
                            }
                        ]} layout={{title: "Hours viewed in the first 28 days"}}/>
                      </Tab.Panel>


                  }

              )}
          </Tab.Panels>
            </div>
        </Tab.Group>
      </section>
        <section className="bg-gray-400 w-full  px-2 py-16 sm:px-0 h-full ">
            <p className="text-red-600 text-3xl mb-10">Global Top 10 Weekly</p>
            <Tab.Group>
                <div className="flex place-content-center">
                    <Tab.List className="flex p-1 space-x-1 bg-gray-900/20 rounded-xl w-2/3 ">
                        {global.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index).map(
                            (category) => (

                                <Tab
                                    key={category}
                                    className={({ selected }) =>
                                        classNames(
                                            'w-full py-2.5 text-sm leading-5 font-medium text-red-700 rounded-lg',
                                            'focus:outline-none  ',
                                            selected
                                                ? 'bg-white shadow'
                                                : 'text-red-100 hover:bg-white/[0.12] hover:text-white'
                                        )
                                    }
                                >
                                    {category}
                                </Tab>


                            )

                        )}



                    </Tab.List>
                </div>
                <div className="mt-16">
                    <Tab.Panels>
                        {global.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index).map(
                            (category, index) => {
                                const data = global.filter(o => o.category === category);

                                return <Tab.Panel>
                                    <Plot key={index} data={[
                                        data.map(i => i.show_title).filter((value, index, self) => self.indexOf(value) === index).map(
                                            (show, index) => {
                                                const currentShow = data.filter(o => o.show_title === show)


                                                return {

                                                    x: currentShow.map(o=> o.week),
                                                    y: currentShow.map(o=> o.weekly_rank),
                                                    type : 'line',

                                                }
                                            }
                                        )

                                    ]} layout={{title: "Hours viewed in the first 28 days"}}/>
                                </Tab.Panel>


                            }

                        )}
                    </Tab.Panels>
                </div>
            </Tab.Group>
        </section>
        <section className="bg-gray-200 w-full  px-2 py-16 sm:px-0 h-full ">
            <p className="text-red-600 text-3xl mb-10">Global Top 10 Weekly</p>
            <Tab.Group>
                <div className="flex place-content-center">
                    <Tab.List className="flex p-1 space-x-1 bg-gray-900/20 rounded-xl w-2/3 ">


                                <Tab

                                    className={({ selected }) =>
                                        classNames(
                                            'w-full py-2.5 text-sm leading-5 font-medium text-red-700 rounded-lg',
                                            'focus:outline-none  ',
                                            selected
                                                ? 'bg-white shadow'
                                                : 'text-red-100 hover:bg-white/[0.12] hover:text-white'
                                        )
                                    }
                                >
                                    Films
                                </Tab>

                        <Tab

                            className={({ selected }) =>
                                classNames(
                                    'w-full py-2.5 text-sm leading-5 font-medium text-red-700 rounded-lg',
                                    'focus:outline-none  ',
                                    selected
                                        ? 'bg-white shadow'
                                        : 'text-red-100 hover:bg-white/[0.12] hover:text-white'
                                )
                            }
                        >
                            TV
                        </Tab>

                    </Tab.List>
                </div>
                <div className="mt-16">
                    <Tab.Panels>

                        <Tab.Panel>
                       <Plot data={[
                           {
                               type:'pie',
                               values : [film_en, film_noen],
                               labels : ["Films in English", "Films in other languages"],
                               textinfo: "label+percent",
                               insidetextorientation : 'radial'
                           }
                       ] } />
                        </Tab.Panel>,
                        <Tab.Panel>
                            <Plot data={[
                                {
                                    type:'pie',
                                    values : [tv_en, tv_noen],
                                    labels : ["Shows in English", "Shows in other languages"],
                                    textinfo: "label+percent",
                                    insidetextorientation : 'radial'
                                }
                            ] } />
                        </Tab.Panel>
                    </Tab.Panels>
                </div>
            </Tab.Group>
        </section>
    </div>
  );
}

export default App;
