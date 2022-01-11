
import './App.css';
import { Tab, Listbox, Transition } from '@headlessui/react';
import Plot from 'react-plotly.js';
import { Fragment, useState } from 'react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function App() {

 let top = require('./data/most-popular.json')
let global = require('./data/all-weeks-global.json')
    let countryTop = require('./data/all-weeks-countries.json')
    const countries = countryTop.map(item =>item.country_name).filter((value, index, self) => self.indexOf(value) === index)
    const [selected, setSelected] = useState(countries[0])
    const dates = countryTop.filter(o => o.country_name===selected).map(o=> o.week).filter((value, index, self) => self.indexOf(value) === index)
    const [date, setDate] = useState(dates[0])

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
                        ]} layout={{title: "Hours viewed in the first 28 days",  paper_bgcolor:"#E5E7EB"}}/>
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
                                const currentShow = data.filter(o => o.week === "2022-01-02")
                                return <Tab.Panel>
                                    <Plot key={index} data={[



                                    {  x: [2,4,6,8,10,12,14,16,18,20],
                                                    y: [10,11,12,13,14,15,16,17,18,19],
                                                    type : 'markers',
                                                    text: currentShow.map(o=> `Title: ${o.show_title} <br> Hours: ${o.weekly_hours_viewed}`),
                                                    marker : {
                                                       color : Array.from({length: 10}).map( (o)=> {return '#'+Math.floor(Math.random()*16777215).toString(16)}),
                                                        size : currentShow.map(o=> o.weekly_hours_viewed/1000000)
                                                    }

                                                }



                                    ]} layout={{title: "2022-01-02 views",  paper_bgcolor:"#9CA3AF"}}/>
                                </Tab.Panel>


                            }

                        )}
                    </Tab.Panels>
                </div>
            </Tab.Group>
        </section>
        <section className="bg-gray-200 w-full  px-2 py-16 sm:px-0 h-full ">
            <p className="text-red-600 text-3xl mb-10">English vs. Non English Productions</p>
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
                               insidetextorientation : 'radial',
                               marker : {
                                   colors: ['rgb(234, 18, 18)', 'rgb(85, 224, 150)']
                               }
                           }
                       ] }layout={{title: "Hours streamed",  paper_bgcolor:"#E5E7EB"}} />
                        </Tab.Panel>
                        <Tab.Panel>
                            <Plot data={[
                                {
                                    type:'pie',
                                    values : [tv_en, tv_noen],
                                    labels : ["Shows in English", "Shows in other languages"],
                                    textinfo: "label+percent",
                                    insidetextorientation : 'radial',
                                    marker : {
                                        colors: ['rgb(234, 18, 18)', 'rgb(85, 224, 150)']
                                    }
                                }
                            ] } layout={{title: "Hours streamed",  paper_bgcolor:"#E5E7EB"}}/>
                        </Tab.Panel>
                    </Tab.Panels>
                </div>
            </Tab.Group>
        </section>
        <section className="bg-gray-400 w-full  px-2 py-16 sm:px-0 h-full ">
            <p className="text-red-600 text-3xl mb-10">Top 10 by Country & Date</p>

            <Tab.Group>
                <div className="flex place-content-center">
                    <Tab.List className="flex p-1 space-x-1 bg-gray-900/20 rounded-xl w-2/3 ">
                        {countryTop.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index).map(
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
                <div className="flex place-content-evenly mt-8" >
                <div className="w-1/6  top-16 z-50">
                    <Listbox value={selected} onChange={setSelected}>
                        <div className="relative mt-1">
                            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                <span className="block truncate">{selected}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
              />
            </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-50"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {countries.map((country, personIdx) => (
                                        <Listbox.Option
                                            key={personIdx}
                                            className={({ active }) =>
                                                `${active ? 'text-amber-900 bg-red-100' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                                            }
                                            value={country}
                                        >
                                            {({ selected, active }) => (
                                                <>
                      <span
                          className={`${
                              selected ? 'font-medium' : 'font-normal'
                          } block truncate`}
                      >
                        {country}
                      </span>
                                                    {selected ? (
                                                        <span
                                                            className={`${
                                                                active ? 'text-amber-600' : 'text-amber-600'
                                                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>
                <div className="w-1/6  top-16 z-50">
                    <Listbox value={date} onChange={setDate}>
                        <div className="relative mt-1">
                            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                <span className="block truncate">{date}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
              />
            </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-50"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {dates.map((date, personIdx) => (
                                        <Listbox.Option
                                            key={personIdx}
                                            className={({ active }) =>
                                                `${active ? 'text-amber-900 bg-red-100' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                                            }
                                            value={date}
                                        >
                                            {({ selected, active }) => (
                                                <>
                      <span
                          className={`${
                              selected ? 'font-medium' : 'font-normal'
                          } block truncate`}
                      >
                        {date}
                      </span>
                                                    {selected ? (
                                                        <span
                                                            className={`${
                                                                active ? 'text-amber-600' : 'text-amber-600'
                                                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>
                </div>
                <div className="mt-16">
                    <Tab.Panels>
                        {countryTop.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index).map(
                            (category, index) => {
                                const data = countryTop.filter(o => o.category === category && o.country_name === selected && o.week === date);

                                return <Tab.Panel>
                                    <Plot key={index} data={[
                                        {
                                           type: 'table',
                                            header: {
                                               values : [["<b>NAME</b>"], ["<b>POSITION</b>"],
                                                   ["<b>WEEKS IN TOP 10</b>"]],
                                                align: ["left", "center"],
                                                line: {width: 1, color: '#84505c'},
                                                fill: {color: '#ff1111'},
                                                font: {family: "Arial", size: 12, color: "white"}
                                            },
                                            cells : {
                                                values: [data.map(o=> o.show_title), data.map(o=> o.weekly_rank), data.map(o=> o.cumulative_weeks_in_top_10) ],
                                                align: ["left", "center"],
                                                line: {color: "#506784", width: 1},
                                                fill: {color: ['#ffb1b1', 'white']},
                                                font: {family: "Arial", size: 11, color: ['black', "#506784"]}
                                            }
                                        }
                                    ]} layout={{title: `TOP 10 in ${selected} the ${date}`,  paper_bgcolor:"#9CA3AF"}}/>
                                </Tab.Panel>


                            }

                        )}
                    </Tab.Panels>
                </div>
            </Tab.Group>
        </section>
    </div>
  );
}

export default App;
