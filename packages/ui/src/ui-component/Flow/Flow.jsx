'use client'
import axios from 'axios';
import { useState, useCallback } from 'react';
import { useEffect } from 'react';
import { Button, useColorModeValue } from '@chakra-ui/react';
import './flow.css'
import AskName from './AskName';
import LeadScoringForm from './LeadScoringForm';
import { FaQuestionCircle } from 'react-icons/fa';


import ReactFlow, {
  Controls,
  Background,
  Box,
  markerEdge,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  onElementClick
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  MdAdd,
  MdClose
} from 'react-icons/md';
import { type } from 'os';
import AskNumber from './AskNumber';
import AskQuestion from './AskQuestion';
import AskAddress from './AskAddress';
import AskUrl from './AskUrl';
import RatingBlock from './RatingBlock';
import OpinionScale from './OpinionRate';
import AskDate from './AskDate';
import AskFile from './AskFile';
import BusinessHoursNode from './BusnissHours';
import AskButton from './AddButtons';

function Flow({ ChatFlow }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [dropdown, setdropdown] = useState(false);
  const markerEdge = { source: '1', target: '2', arrowHeadType: 'arrow' };
  const [addMessage, sentMessage] = useState(false);
  const [text, setText] = useState('');
  const [messageForm, SetMessageForm] = useState('closeform');
  const [addUpload, setAddUpload] = useState(false);
  const [uploadText, setUploadText] = useState('');
  const [uploadDocument, setuploadDocument] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  // const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [question, setQuestion] = useState('');
  const [showLeadScoringForm, setShowLeadScoringForm] = useState(false);
  const [showURLForm, setShowURLForm] = useState(false);
  const [addDate, setAddDate] = useState(false);

  const [showAutoCompleteForm, setShowAutoCompleteForm] = useState(false);
  const [LeadGenration, setLeadGenration] = useState(false);
  const [LeadGenrationNumber, setLeadGenrationNumber] = useState(false);
  const [LeadGenrationName, setLeadGenrationName] = useState(false);
  const [LeadGenrationFile, setLeadGenrationFile] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showRatingBlock, setShowRatingBlock] = useState(false);
  const [addRatingBlock, setaddRatingBlock] = useState(false);
  const [addbussnisshours, setaddbussnisshours] = useState(false);
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const [clickedEdge, setClickedEdge] = useState(null);


  useEffect(() => {
    const customNode = {
      id: 'customNodeId',
      data: { label: 'Custom Node' },
      position: { x: 20, y: 30 },
      type: 'input'
    };

    axios.get('http://localhost:3005/v1/getnodes/')
      .then(response => {
        const formattedNodes = response.data.map(node => ({
          id: node.id.toString(), // Convert id to string if necessary
          data: { label: node.label }, // Adjust data structure as per your needs
          position: { x: node.positionX, y: node.positionY }, // Adjust position field names
        }));

        const allNodes = [customNode, ...formattedNodes];
        setNodes(allNodes);

        const formattedEdges = formattedNodes.map(node => ({
          id: `e1-${node.id}`,
          source: customNode.id,
          target: node.id,
        }));

        setEdges(formattedEdges);
      })
      .catch(error => {
        console.error('Error fetching initial nodes:', error);
      });
  }, []);


  function addNewMessage() {
    sentMessage(true)
    SetMessageForm('openform')
  }
  function closeform() {
    sentMessage(false)
    setAddUpload(false)
    setuploadDocument(false)
    setUploadText(false)
    SetMessageForm('closeform')
    setClickedEdge(false)
    setFormSubmit(false)
    setShowAutoCompleteForm(false)
    setLeadGenration(false)
    setLeadGenrationName(false)
    setLeadGenrationNumber(false)
    setShowLeadScoringForm(false)
    setShowURLForm(false)
    setShowAddressForm(false)
    setShowRatingBlock(false)
    setAddDate(false)
    setLeadGenrationFile(false)
    setaddRatingBlock(false)
    setaddbussnisshours(false)
  }
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const addNewField = (text) => {
    const newNodeId = (nodes.length + 1).toString();
    const lastNode = nodes[nodes.length - 1];
    const newX = lastNode.position.x + 30;
    const newY = lastNode.position.y + 30;
    const newNode = {
      id: newNodeId,
      data: { label: text },
      position: { x: newX, y: newY },
    };

    const newEdge = {
      id: `e1-${newNodeId}`,
      source: lastNode.id,
      target: newNodeId
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
    setEdges((prevEdges) => [...prevEdges, newEdge]);
    axios.post('http://localhost:3005/v1/addnode', newNode)
      // axios.post('http://localhost:3005/v1/addnode', newNode)
      .then(response => {
        console.log(response.data); // Handle success
      })
      .catch(error => {
        console.error('Error adding new node:', error); // Handle error
      });
    setClickedEdge(false)
    SetMessageForm('closeform')
  };

  function addUploadMedia() {
    const newNodeId = (nodes.length + 1).toString();
    const lastNode = nodes[nodes.length - 1];
    const newX = lastNode.position.x + 20;
    const newY = lastNode.position.y + 20;
    const newNode = {
      id: newNodeId,
      data: { label: uploadText },
      position: { x: newX, y: newY },
    };

    const newEdge = {
      id: `e1-${newNodeId}`,
      source: lastNode.id,
      target: newNodeId,
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
    setEdges((prevEdges) => [...prevEdges, newEdge]);

    // Clear upload form and close form
    setUploadText('');
    setAddUpload(false);
    SetMessageForm('closeform');
  }


  function getMessageBox() {
    sentMessage(true)
    SetMessageForm('openform')
  }
  function getUploadMedia() {
    setAddUpload(true)
    SetMessageForm('openform')
  }
  function AdduploadDocument() {
    setuploadDocument(true)
    SetMessageForm('openform')
  }


  const defaultEdgeOptions = {
    animated: true,
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailError === '') {
      console.log('Form submitted with email:', email);
      setEmail('');
      setFormSubmit(false);
      SetMessageForm('closeform');
    } else {
      console.log('Form has errors');
    }
  };

  function handleEmailSent() {
    setFormSubmit(true);
    SetMessageForm('openform');
  }


  const fitViewOptions = {
    padding: 0.2,
  };
  const handleEdgeClick = (event, edge) => {
    setClickedEdge({ x: event.clientX, y: event.clientY, edge });
  };

  function handleYesClick() {
    const newNodeId = (nodes.length + 1).toString();
    const lastNode = nodes[nodes.length - 1];
    const newX = lastNode.position.x + 20;
    const newY = lastNode.position.y + 20;

    // Check if there is already a "Live Chat" node
    const liveChatNode = nodes.find(node => node.data.label === 'No Live Chat');

    if (liveChatNode) {
      const updatedNode = {
        ...liveChatNode,
        data: { label: 'Live Chat' },
        position: { x: newX, y: newY }
      };

      const newEdge = {
        id: `e1-${updatedNode.id}`,
        source: lastNode.id,
        target: updatedNode.id
      };

      setNodes(prevNodes => prevNodes.map(node =>
        node.id === updatedNode.id ? updatedNode : node
      ));
      setEdges(prevEdges => [...prevEdges, newEdge]);

      axios.post('http://localhost:3005/v1/addnode', updatedNode)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error updating node:', error);
        });
    } else {
      // Create new "No Live Chat" node
      const newNode = {
        id: newNodeId,
        data: { label: 'Live Chat' },
        position: { x: newX, y: newY },
      };

      const newEdge = {
        id: `e1-${newNodeId}`,
        source: lastNode.id,
        target: newNodeId
      };

      setNodes(prevNodes => [...prevNodes, newNode]);
      setEdges(prevEdges => [...prevEdges, newEdge]);

      axios.post('http://localhost:3005/v1/addnode', newNode)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error adding new node:', error);
        });
    }

    setClickedEdge(false);
    setShowForm(false);
    SetMessageForm('closeform');
  }


  function handleButtonClick() {
    setShowForm(true);
    SetMessageForm('openform')
  }

  function handleNoClick() {
    const newNodeId = (nodes.length + 1).toString();
    const lastNode = nodes[nodes.length - 1];
    const newX = lastNode.position.x + 20;
    const newY = lastNode.position.y + 20;

    // Check if there is already a "Live Chat" node
    const liveChatNode = nodes.find(node => node.data.label === 'Live Chat');

    if (liveChatNode) {
      const updatedNode = {
        ...liveChatNode,
        data: { label: 'No Live Chat' },
        position: { x: newX, y: newY }
      };

      const newEdge = {
        id: `e1-${updatedNode.id}`,
        source: lastNode.id,
        target: updatedNode.id
      };

      setNodes(prevNodes => prevNodes.map(node =>
        node.id === updatedNode.id ? updatedNode : node
      ));
      setEdges(prevEdges => [...prevEdges, newEdge]);

      axios.post('http://localhost:3005/v1/addnode', updatedNode)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error updating node:', error);
        });
    } else {
      // Create new "No Live Chat" node
      const newNode = {
        id: newNodeId,
        data: { label: 'No Live Chat' },
        position: { x: newX, y: newY },
      };

      const newEdge = {
        id: `e1-${newNodeId}`,
        source: lastNode.id,
        target: newNodeId
      };

      setNodes(prevNodes => [...prevNodes, newNode]);
      setEdges(prevEdges => [...prevEdges, newEdge]);

      axios.post('http://localhost:3005/v1/addnode', newNode)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error adding new node:', error);
        });
    }

    setClickedEdge(false);
    setShowForm(false);
    SetMessageForm('closeform');
  }


  function handleAutoCompleteForm() {
    setShowAutoCompleteForm(true);
    SetMessageForm('openform');
  }

  function handleaskquestion() {
    setLeadGenration(true);
    SetMessageForm('openform');
  }
  function handleaskname() {
    setLeadGenrationName(true);
    SetMessageForm('openform');
  }
  function handleasknumber() {
    setLeadGenrationNumber(true);
    SetMessageForm('openform');
  }

  const addNewLeadGenNode = (question) => {
    const newNodeId = `leadgen-${nodes.length + 1}`;
    const lastNode = nodes[nodes.length - 1];
    const newX = lastNode.position.x + 30;
    const newY = lastNode.position.y + 30;

    const newNode = {
      id: newNodeId,
      data: { label: question, icon: <MdAdd /> },
      position: { x: newX, y: newY },
      type: 'default'
    };

    const newEdge = {
      id: `e1-${newNodeId}`,
      source: lastNode.id,
      target: newNodeId,
    };

    setNodes(prevNodes => [...prevNodes, newNode]);
    setEdges(prevEdges => [...prevEdges, newEdge]);

    axios.post('http://localhost:3005/v1/addnode', newNode)
      .then(response => {
        console.log('New lead gen node added:', response.data);
      })
      .catch(error => {
        console.error('Error adding new lead gen node:', error);
      });
    SetMessageForm('closeform');
    setShowLeadGenForm(false);
  };

  const handleaddname = (name) => {
    const newNodeId = `leadgen-${nodes.length + 1}`;
    const lastNode = nodes[nodes.length - 1];
    const newX = lastNode.position.x + 30;
    const newY = lastNode.position.y + 30;

    const newNode = {
      id: newNodeId,
      data: { label: name },
      position: { x: newX, y: newY },
      type: 'default'
    };

    const newEdge = {
      id: `e1-${newNodeId}`,
      source: lastNode.id,
      target: newNodeId,
    };

    setNodes(prevNodes => [...prevNodes, newNode]);
    setEdges(prevEdges => [...prevEdges, newEdge]);

    axios.post('http://localhost:3005/v1/addnode', newNode)
      .then(response => {
        console.log('New lead gen name added:', response.data);
      })
      .catch(error => {
        console.error('Error adding new name gen node:', error);
      });
    SetMessageForm('closeform');
    setLeadGenrationName(false);
  };



  const handleaddnumber = (number) => {
    const newNodeId = `leadgen-${nodes.length + 1}`;
    const lastNode = nodes[nodes.length - 1];
    const newX = lastNode.position.x + 30;
    const newY = lastNode.position.y + 30;

    const newNode = {
      id: newNodeId,
      data: { label: number },
      position: { x: newX, y: newY },
      type: 'default'
    };

    const newEdge = {
      id: `e1-${newNodeId}`,
      source: lastNode.id,
      target: newNodeId,
    };

    setNodes(prevNodes => [...prevNodes, newNode]);
    setEdges(prevEdges => [...prevEdges, newEdge]);

    axios.post('http://localhost:3005/v1/addnode', newNode)
      .then(response => {
        console.log('New lead gen number added:', response.data);
      })
      .catch(error => {
        console.error('Error adding new number gen node:', error);
      });
    SetMessageForm('closeform');
    setLeadGenrationNumber(false);
  };


  const handleAddRating = () => {
    setShowRatingBlock(true);
    SetMessageForm('openform');
  };

  const handleRatingSubmit = (rating) => {
    console.log('Rating submitted:', rating);
    setShowRatingBlock(false);
  };


  const handleopinionRating = () => {
    setaddRatingBlock(true);
    SetMessageForm('openform');
  };

  const handleratingadd = (rating) => {
    console.log('Rating submitted:', rating);
    setaddRatingBlock(false);
  };

  const handleAddAddress = () => {
    setShowAddressForm(true);
    SetMessageForm('openform');
  };

  const handleAddressSubmit = (address) => {
    console.log('Address submitted:', address);
    setShowAddressForm(false);
  };

  const handleAddURL = () => {
    setShowURLForm(true);
    SetMessageForm('openform');
  };

  const handleURLSubmit = (url) => {
    console.log('URL submitted:', url);
    setShowURLForm(false);
    SetMessageForm('openform');
  };

  const handlerate = (rating) => {
    setShowURLForm(false);
    SetMessageForm('openform');
  }

  const handleAddLeadScoring = () => {
    setShowLeadScoringForm(true);
    SetMessageForm('openform');
  };

  const handleLeadScoringSubmit = (score) => {
    console.log('Lead score submitted:', score);
    setShowLeadScoringForm(false);
  };

  const handleAddDate = () => {
    setAddDate(true);
    SetMessageForm('openform');
  };


  const handdateadd = (formData) => {
    console.log('Lead score submitted:', formData);
    setAddDate(false);
  };


  const handleAddFile = () => {
    setLeadGenrationFile(true);
    SetMessageForm('openform');
  };
  const handleaddfile = (file) => {
    const newNodeId = `leadgen-${nodes.length + 1}`;
    const lastNode = nodes[nodes.length - 1];
    const newX = lastNode.position.x + 30;
    const newY = lastNode.position.y + 30;

    const newNode = {
      id: newNodeId,
      data: { label: file },
      position: { x: newX, y: newY },
      type: 'default'
    };

    const newEdge = {
      id: `e1-${newNodeId}`,
      source: lastNode.id,
      target: newNodeId,
    };

    setNodes(prevNodes => [...prevNodes, newNode]);
    setEdges(prevEdges => [...prevEdges, newEdge]);

    axios.post('http://localhost:3005/v1/addnode', newNode)
      .then(response => {
        console.log('New lead gen name added:', response.data);
      })
      .catch(error => {
        console.error('Error adding new name gen node:', error);
      });
    SetMessageForm('closeform');
    setLeadGenrationFile(false);
  };


  const handleAddBusnisshours = () => {
    setaddbussnisshours(true);
    SetMessageForm('openform');
  };


  const handleBusinessHours = (interactionTime) => {
    if (!interactionTime.trim()) {
      console.log('Interaction time is required.');
      return;
    }

    const newNodeId = `business-hours-${nodes.length + 1}`;
    const lastNode = nodes[nodes.length - 1];
    const newX = lastNode.position.x + 30;
    const newY = lastNode.position.y + 30;

    const newNode = {
      id: newNodeId,
      data: { label: interactionTime },
      position: { x: newX, y: newY },
      type: 'default'
    };

    const newEdge = {
      id: `e1-${newNodeId}`,
      source: lastNode.id,
      target: newNodeId,
    };

    setNodes(prevNodes => [...prevNodes, newNode]);
    setEdges(prevEdges => [...prevEdges, newEdge]);

    axios.post('http://localhost:3005/v1/addnode', newNode)
      .then(response => {
        console.log('New interactionTime added:', response.data);
      })
      .catch(error => {
        console.error('Error interactionTime node:', error);
      });
    SetMessageForm('closeform');
    setaddbussnisshours(false);
  };


  return (
    <div style={{ height: '100vh', zIndex: '1000', background: '#454b6b', position: 'relative' }}>
      <div className="react_flow_design_icons react-flow__edge-default" onClick={addNewMessage}>
      </div>
      <ReactFlow
        onClickConnectEnd={handleEdgeClick}
        nodes={nodes}
        onNodesChange={changes => setNodes(prevNodes => applyNodeChanges(changes, prevNodes))}
        edges={edges}
        fitViewOptions={fitViewOptions}
        defaultEdgeOptions={defaultEdgeOptions}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        markerEdge={markerEdge}
        fitView
        snapToGrid={true}
        snapGrid={[15, 15]}
      >
        <Background variant="dots" />
        <Controls />
      </ReactFlow>
      {/* <div className=''>
        <button onClick={handleEdgeClick}>
          +
        </button>
      </div> */}
      {clickedEdge && (
        <div className="selected_dropdown-main" style={{ position: 'absolute', top: clickedEdge.y, left: clickedEdge.x }}>
          <div className='search_frop'>
            <div class="sc-iGgVNO pcBUt">
              <div mr="1" class="sc-aYaIB sc-gEvDqW lfziQO hFCtfK">
                <span class="sc-jXbVAB Cxxqa">
                  <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="magnifying-glass" class="svg-inline--fa fa-magnifying-glass " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z"></path></svg>
                </span>
              </div>
              <input placeholder="Search by name" id=":r1s:" class="sc-gsFSjX hwwsqP" value="" /></div>
          </div>
          <div className='selected_dropdown-menu'>
            <div className='box_node' onClick={getMessageBox}>
              <span aria-label="block-icon" class="sc-jXbVAB iRxoOW"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40 35.5556C40 38.01 38.01 40 35.5556 40H4.44444C1.99 40 0 38.01 0 35.5556V4.44444C0 1.99 1.99 0 4.44444 0H35.5556C38.01 0 40 1.99 40 4.44444V35.5556Z" fill="#3B88C3"></path><path d="M20.0001 32.2223C26.7502 32.2223 32.2223 26.7502 32.2223 20.0001C32.2223 13.2499 26.7502 7.77783 20.0001 7.77783C13.2499 7.77783 7.77783 13.2499 7.77783 20.0001C7.77783 26.7502 13.2499 32.2223 20.0001 32.2223Z" fill="white"></path></svg></span>
              <Button fontSize="sm" me="0px" borderRadius="16px" fontWeight="500">Buttons</Button>
            </div>
            <div className='box_node' onClick={getUploadMedia}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40 27.7778V4.44444C40 4.44444 40 0 35.5556 0H4.44444C4.44444 0 0 0 0 4.44444V27.6911L40 27.7778Z" fill="#88C9F9"></path><path d="M30 11.1112H24.4445L18.8889 26.6668H40V5.55566C38.8889 5.55566 33.9789 6.02122 32.2222 7.77789C31.1111 8.889 31.1111 10.0001 30 11.1112Z" fill="#292F33"></path><path d="M26.6667 12.2222C27.7778 11.1111 29.4411 11.6688 30 11.1111C30.5667 10.5444 30.8444 9.97883 31.1278 9.41216C26.9756 9.27772 23.5389 9.47328 22.2222 9.99994C16.6667 12.2222 17.7778 22.2222 10 27.7777C10 27.7777 15.5556 29.9988 20 25.5555C22.9122 22.6422 23.5667 15.3222 26.6667 12.2222Z" fill="#66757F"></path><path d="M4.44444 40.0001H35.5556C40 40.0001 40 35.5557 40 35.5557V25.5557H0V35.5557C0 40.0001 4.44444 40.0001 4.44444 40.0001Z" fill="#5C913B"></path><path d="M31.1111 25.5557C31.1111 26.6668 20 26.6668 20 28.889C20 31.1112 24.4445 31.1112 24.4445 32.2223C24.4445 33.3334 8.98114 35.5557 8.88892 40.0001H27.7778C27.7778 37.7779 33.3334 36.6668 33.3334 33.3334C33.3334 30.0001 25.5556 30.0001 25.5556 28.889C25.5556 27.7779 33.3334 26.6668 33.3334 25.5557H31.1111Z" fill="#55ACEE"></path><path d="M31.1111 25.5558V20.0002C31.1111 12.2224 33.3333 11.1113 33.3333 11.1113H34.4444C34.4444 11.1113 33.3333 12.2224 33.3333 18.8891V25.5558H31.1111Z" fill="#226699"></path><path d="M12.8113 31.6698C12.8113 32.8954 11.8191 33.3332 10.5935 33.3332C9.36907 33.3332 8.37573 32.8943 8.37573 31.6698L8.93018 26.6821C8.93018 25.4576 9.36907 25.5743 10.5935 25.5743C11.8191 25.5743 12.2568 25.4587 12.2568 26.6821L12.8113 31.6698Z" fill="#662113"></path><path d="M18.0245 28.5089C17.7445 28.2689 17.4801 28.02 17.2234 27.7678C17.1323 27.5922 16.9979 27.4067 16.7723 27.1989C16.5734 27.0167 16.3812 26.8278 16.1934 26.6367C17.3267 26.4745 17.8156 25.89 16.7723 24.9967C16.4312 24.7045 16.109 24.3967 15.8001 24.0822C15.9356 23.8611 15.849 23.5622 15.4179 23.1922C15.2756 23.0711 15.1379 22.9456 15.0034 22.8189C15.8623 22.6856 16.2212 22.23 15.4179 21.5422C15.1723 21.3311 14.9401 21.11 14.7156 20.8845C14.9234 20.7022 14.899 20.4278 14.4867 20.0756C14.4001 20.0011 14.3245 19.92 14.2412 19.8433C14.8656 19.7178 15.1045 19.3622 14.4867 18.8322C14.0956 18.4967 13.7467 18.13 13.4201 17.7611C13.8412 17.66 13.9923 17.4078 13.5934 17.0411C13.8856 16.9111 13.9423 16.6711 13.5567 16.3411C12.1345 15.1234 11.3356 13.3789 10.5945 13.3789C9.85341 13.3789 9.05452 15.1234 7.63341 16.3411C7.24785 16.6722 7.30452 16.9122 7.59674 17.0411C7.19785 17.4078 7.34896 17.66 7.77007 17.7611C7.44341 18.13 7.09452 18.4967 6.70341 18.8322C6.08563 19.3622 6.32452 19.7167 6.94896 19.8433C6.86563 19.92 6.79007 20.0011 6.70341 20.0756C6.29119 20.4289 6.26674 20.7022 6.47452 20.8845C6.25007 21.11 6.01896 21.3311 5.7723 21.5422C4.96896 22.23 5.32785 22.6856 6.18674 22.8189C6.0523 22.9467 5.91452 23.0711 5.7723 23.1922C5.34119 23.5622 5.25341 23.8611 5.39007 24.0822C5.08119 24.3967 4.75896 24.7045 4.41785 24.9967C3.37452 25.89 3.86341 26.4756 4.99674 26.6367C4.80896 26.8278 4.61674 27.0167 4.41785 27.1989C4.1923 27.4056 4.05785 27.5922 3.96674 27.7667C3.71007 28.02 3.44452 28.2689 3.16452 28.5089C1.54341 29.8989 2.31452 30.7034 4.53785 30.5422C6.52007 30.3989 8.37341 29.9489 10.5945 29.9489C12.8156 29.9489 14.669 30.3989 16.6512 30.5422C18.8734 30.7034 19.6467 29.8989 18.0245 28.5089Z" fill="#3E721D"></path><path d="M12.5711 4.08666C12.2666 4.08666 11.9722 4.13333 11.6966 4.21889C11.3677 3.28222 10.4788 2.60889 9.42995 2.60889C8.30439 2.60889 7.36328 3.38333 7.10106 4.42778C6.82328 4.21778 6.47995 4.08778 6.10328 4.08778C5.18439 4.08778 4.43995 4.83222 4.43995 5.75111C4.43995 5.97444 4.4855 6.18666 4.56661 6.38111C4.40661 6.33666 4.24217 6.30555 4.07106 6.30555C3.04883 6.30444 2.22217 7.13111 2.22217 8.15222C2.22217 9.17333 3.04883 10 4.06995 10H12.5699C14.2022 10 15.5266 8.67666 15.5266 7.04333C15.5277 5.41111 14.2022 4.08666 12.5711 4.08666Z" fill="#F5F8FA"></path></svg>
              <Button  fontSize="sm" me="0px" borderRadius="16px" fontWeight="500">Upload Media</Button>
            </div>
            <div className='box_node' onClick={handleButtonClick}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36.0001 31.2529C36.0001 31.2529 36.6723 32.6478 38.0246 31.9515C39.3758 31.2565 38.3584 34.392 38.3584 34.392C38.3584 34.392 35.0693 34.5367 32.7407 34.4144C30.6079 34.3026 31.9466 33.3382 33.2966 32.6431L36.0001 31.2529Z" fill="#DD551F"></path><path d="M29.2578 14.2541C28.5116 15.4761 27.5398 16.7016 26.8904 16.8745C26.4028 17.005 25.4322 17.2473 24.7862 17.6542C24.1402 18.06 24.2359 18.4775 25.0767 18.9045C25.9163 19.3326 27.0169 19.1503 27.5922 18.4905C28.1676 17.8295 29.6817 16.7816 30.6181 16.1606C31.5523 15.5407 29.8184 13.3367 29.2578 14.2541Z" fill="#F9CA55"></path><path d="M28.9766 14.8469C29.3035 14.2823 30.068 13.619 30.068 13.619L29.6271 10.7104L33.078 10.8516C33.078 10.8516 32.5983 13.8601 32.4525 14.5411C32.3078 15.2221 30.9658 16.1077 30.0748 16.5005C29.1851 16.8933 28.6109 15.4785 28.9766 14.8469ZM34.9475 26.5481C34.9475 26.5481 30.9601 25.0203 30.9601 26.1071C30.9601 27.1926 34.6627 29.1215 36.0162 31.4737C36.5619 32.424 38.6331 33.0697 38.1523 31.0327C37.3639 27.6937 34.9475 26.5481 34.9475 26.5481Z" fill="#F9CA55"></path><path d="M32.0879 26.119C32.0879 26.119 33.5724 27.9032 34.5202 27.4304C35.4681 26.9576 37.3058 22.9987 37.7957 21.5498C38.2856 20.1008 37.2363 17.1558 35.7997 19.0752C34.363 20.997 32.0879 26.119 32.0879 26.119Z" fill="#F9CA55"></path><path d="M39.0498 19.269L32.0991 22.0647L36.491 24.511L39.0498 19.269Z" fill="#DD551F"></path><path d="M30.9587 22.0649C30.9587 22.0649 28.6802 25.5933 28.6802 26.7694C28.6802 27.9456 29.8195 31.4739 29.8195 35.0023C29.8195 38.5307 32.098 38.5307 32.098 37.3546C32.098 36.1784 32.6836 30.9306 31.7904 29.0499C31.3404 28.1032 34.3766 24.4172 34.3766 24.4172L30.9587 22.0649Z" fill="#FFDC5D"></path><path d="M33.2373 17.3601L30.2478 23.2408L33.6656 25.5201C33.6656 25.5201 40 19.6195 40 17.2672C40 13.9776 36.9718 13.3354 36.9718 13.3354L33.2373 17.3601Z" fill="#FA743E"></path><path d="M29.8147 4.48633L30.97 7.02911L28.0511 8.2464L26.8469 6.16466L29.8147 4.48633Z" fill="#FFDC5D"></path><path d="M30.3606 4.2536C30.1578 6.12128 28.622 6.93163 27.0794 7.55145C25.6086 8.14186 24.3873 5.48618 24.1902 3.63143C23.9909 1.76375 26.1054 0.338284 27.7493 0.528816C29.3933 0.719348 30.5633 2.38592 30.3606 4.2536ZM24.7827 14.6329C23.2879 15.662 21.4901 17.2874 20.5639 17.4344C19.4383 17.6132 18.6408 16.3312 17.6132 17.8649C16.9649 18.8317 18.0005 19.8596 20.1367 19.8596C21.366 19.8596 24.7975 17.9472 26.1179 16.9922C27.542 15.9631 27.8587 14.7964 28.3759 13.3921C28.5388 12.9487 28.9866 14.1507 30.0336 14.5447C31.9316 15.2574 32.7405 16.2571 33.3808 17.2862C36.4431 15.595 37.9174 14.0331 37.9174 14.0331C35.575 11.8808 35.6251 9.44383 33.808 8.02425C30.9359 5.78021 29.718 7.13863 27.6764 8.18185C26.233 8.92046 25.6371 11.2515 24.7827 14.6329Z" fill="#FFDC5D"></path><path d="M33.309 17.5816C36.3714 15.8903 38.7251 14.2638 38.7251 14.2638C35.812 12.0115 35.6252 9.44401 33.808 8.0256C33.4047 7.71158 33.0379 7.474 32.6938 7.29053C32.8362 7.55986 32.8146 7.8433 32.3133 8.0256C31.2287 8.42078 29.9709 7.69982 28.646 7.6516C28.4124 7.78332 28.172 7.91975 27.9202 8.05501C29.0345 8.19614 30.2922 9.61102 30.5326 11.04C30.7764 12.4855 30.2899 13.8168 29.6998 14.4049C29.7841 14.4625 29.8638 14.5319 29.963 14.5684C31.861 15.2799 32.8328 16.2832 33.309 17.5816ZM29.7385 35.9115C29.7385 35.9115 30.5417 37.3534 31.9385 36.5231C33.3352 35.6939 32.4454 39.1 32.4454 39.1C32.4454 39.1 28.5525 40.4537 26.3526 39.8409C24.1527 39.2282 25.5494 38.399 26.9462 37.5698L29.7385 35.9115Z" fill="#FA743E"></path><path d="M29.9162 0.792322C28.9683 -0.106237 26.2739 -0.529641 24.9239 1.11811C23.7789 1.14163 23.641 2.28835 23.7698 2.91993C23.9156 3.63501 24.7541 3.68676 25.0332 4.36774C25.1962 4.089 25.4308 3.51505 25.3374 3.26336C25.7863 3.56445 25.5915 4.95227 26.9108 5.12869C28.4887 5.34039 28.4659 6.8964 28.4659 6.8964C28.4659 6.8964 29.7795 6.30717 30.3901 5.26982C31.2058 3.88435 30.9609 1.78379 29.9162 0.792322Z" fill="#FFAC33"></path><path d="M10.5544 31.6245C10.5544 31.6245 9.71586 32.9206 8.46038 32.0538C7.2049 31.1882 7.83036 34.4307 7.83036 34.4307C7.83036 34.4307 11.0762 35.0023 13.4003 35.1858C15.5296 35.3528 14.3197 34.2226 13.0653 33.3569L10.5544 31.6245Z" fill="#66757F"></path><path d="M3.44874 35.355C3.44874 35.355 2.39605 36.6134 1.17703 35.5267C-0.0419989 34.4399 0.206363 37.9589 0.206363 37.9589C0.206363 37.9589 3.78027 40.0477 6.05313 39.8772C8.32599 39.7054 7.10696 38.6187 5.8868 37.5308L3.44874 35.355Z" fill="#99AAB5"></path><path d="M7.17744 7.84066C8.85446 7.55486 11.3301 8.74157 11.8086 9.71187C12.9228 11.97 11.1512 13.3931 10.5679 14.1129C9.95842 14.8656 7.26972 16.5851 6.97693 18.6304C6.78439 19.9806 7.14213 19.9512 8.00912 20.591C8.8761 21.2296 11.8975 22.7821 12.352 23.8054C12.8055 24.8274 12.6574 25.519 12.1618 26.3293C11.6662 27.1397 10.3686 30.888 10.4506 31.8677C10.4506 31.8677 9.33637 32.8474 8.30419 31.9535C8.30419 31.9535 8.54116 29.1955 8.74737 28.0029C8.95358 26.8104 9.54372 25.466 9.54372 25.466L6.3583 24.4922C6.3583 24.4922 6.93592 26.1317 6.8949 26.8986C6.85389 27.6654 5.89917 29.1426 5.49131 29.6683C4.83053 30.521 3.47024 33.586 3.44859 35.3561C3.44859 35.3561 2.43463 36.7839 1.17687 35.5278C1.17687 35.5278 1.53119 32.4052 1.69638 31.2549C1.86158 30.1047 2.7673 27.8371 3.05554 27.2832C3.34492 26.7292 2.62945 26.247 2.29906 25.5225C1.96867 24.798 0 22.0423 0 20.5075C0 18.9738 0.34634 17.7754 1.17459 16.7063C2.29792 15.2585 3.06465 11.6348 3.34264 10.7057C3.88152 8.91446 5.17573 8.18173 7.17744 7.84066Z" fill="#99AAB5"></path><path d="M6.14522 23.9019C6.14522 23.9019 3.53286 24.624 2.33548 25.5837C2.63853 26.3211 3.29589 26.7716 3.05665 27.2809C2.79005 27.8466 1.86154 30.1024 1.69749 31.2526C1.53229 32.4029 1.17798 35.5255 1.17798 35.5255C2.43574 36.7828 3.44856 35.3549 3.44856 35.3549C3.4702 33.5849 4.8305 30.5199 5.49128 29.6672C5.89914 29.1415 6.85385 27.6643 6.89487 26.8974C6.93588 26.1306 6.4403 24.6393 6.4403 24.6393L6.14522 23.9019Z" fill="#FFDC5D"></path><path d="M12.352 23.8041C12.0729 23.1761 10.8288 22.3505 9.70776 21.6577C8.72343 22.3975 7.82454 24.4886 7.64111 24.9309L9.47307 25.5742C9.47307 25.5742 8.9547 26.808 8.74849 28.0006C8.54228 29.1931 8.30531 31.9512 8.30531 31.9512C9.3375 32.8462 10.4517 31.8653 10.4517 31.8653C10.3697 30.8856 11.6673 27.1361 12.1629 26.3269C12.6585 25.5178 12.8055 24.8274 12.352 23.8041Z" fill="#F9CA55"></path><path d="M2.94029 11.8102C2.76256 13.1698 4.07957 13.5379 5.21884 13.0592C6.35812 12.5817 7.28321 11.7725 7.4974 10.5235C7.63525 9.71432 7.2479 7.84075 6.0733 8.09832C4.49199 8.4441 3.21714 9.6955 2.94029 11.8102Z" fill="#FFDC5D"></path><path d="M9.66113 8.14209C10.7651 8.28911 11.9636 9.19472 12.3202 10.2979C12.6768 11.4011 13.1325 13.8651 13.2601 14.1721C13.3672 14.4296 13.4116 14.8519 13.8081 14.679C14.3071 14.4626 15.901 14.1627 16.5777 14.0897C17.2544 14.0168 17.2544 13.0606 18.1442 12.7301C19.034 12.3997 20.0308 13.0242 20.0673 13.9427C20.1026 14.8613 19.8531 15.2659 18.7138 15.4858C17.5745 15.7057 16.8625 16.0374 16.5059 16.2209C16.1505 16.4044 12.9457 17.397 12.4831 17.2865C12.0206 17.1759 10.5691 14.1133 10.5691 14.1133C10.5691 14.1133 11.5899 13.2594 11.37 10.9589C11.206 9.24647 9.66113 8.14209 9.66113 8.14209Z" fill="#F9CA55"></path><path d="M3.08282 11.6266C3.0418 12.6192 3.47473 16.3311 3.51004 16.9191C3.54536 17.5072 8.03183 19.5654 8.45906 19.7489C8.88629 19.9324 9.70543 21.0356 10.3457 21.072C10.9871 21.1085 12.802 20.778 12.197 19.7489C11.5921 18.7198 10.5587 18.0953 9.77606 18.1682C8.99224 18.2411 7.24573 16.5251 6.31266 16.1205C5.85581 15.923 5.83417 15.5348 5.96746 14.9703C6.12241 14.3117 6.45393 12.4134 6.52571 11.6054C6.59634 10.7974 3.15459 9.89885 3.08282 11.6266Z" fill="#FFDC5D"></path><path d="M7.63996 24.9323C7.53287 24.9688 6.35828 24.4913 6.35828 24.4913L5.39673 21.9556L8.13783 23.6092C8.13783 23.6092 7.99542 23.9761 7.85301 24.2702C7.7106 24.5642 7.63996 24.9323 7.63996 24.9323Z" fill="#66757F"></path><path d="M9.34895 7.62061C9.66909 7.65707 10.2524 8.872 10.3105 9.38479C10.4176 10.341 9.27832 10.7444 8.6369 9.6059C7.99549 8.46741 7.71181 7.9511 7.17749 7.84054C7.17749 7.84054 7.74713 7.69353 8.28145 7.65707C8.81577 7.62061 9.34895 7.62061 9.34895 7.62061Z" fill="#FFDC5D"></path><path d="M8.5618 5.36865L7.4624 7.84086L9.84805 9.38511L10.9873 7.17988L8.5618 5.36865Z" fill="#FFDC5D"></path><path d="M8.0148 5.1356C8.2176 7.00329 9.97322 8.35465 11.4497 8.50284C13.0971 8.66868 13.9709 6.38817 14.1772 4.46991C14.3777 2.60223 12.27 1.21911 10.626 1.40964C8.98091 1.60017 7.81201 3.26792 8.0148 5.1356Z" fill="#FFDC5D"></path><path d="M8.27466 1.45806C9.21798 0.553621 11.9169 0.136097 13.267 1.78385C14.4119 1.80737 14.6614 3.68211 14.4507 4.29017C14.2821 4.77473 12.9024 3.26459 11.9887 4.70887C11.8258 4.43012 11.5148 3.83383 11.6082 3.58214C11.1593 3.88323 11.3917 4.85823 9.78078 5.20637C8.22225 5.54391 8.13909 7.19402 8.13909 7.19402C8.13909 7.19402 5.6942 3.9338 8.27466 1.45806Z" fill="#FFAC33"></path></svg>
              <Button  fontSize="sm" me="0px" borderRadius="16px" fontWeight="500">Yes/No</Button>
            </div>
            <div className='box_node' onClick={handleAutoCompleteForm}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#FFCC4D"></path><path d="M30.3723 26.2542C30.1745 26.0753 29.879 26.0642 29.6668 26.222C29.6234 26.2542 25.309 29.4442 20.0001 29.4442C14.7045 29.4442 10.3757 26.2542 10.3334 26.222C10.1212 26.0642 9.82565 26.0775 9.62788 26.2542C9.43121 26.432 9.38676 26.7253 9.52343 26.952C9.66676 27.1909 13.0979 32.7775 20.0001 32.7775C26.9023 32.7775 30.3345 27.1909 30.4768 26.952C30.6134 26.7242 30.5701 26.432 30.3723 26.2542Z" fill="#664500"></path><path d="M20 29.5457C19.8355 29.5457 19.6766 29.5335 19.5133 29.528V34.5457H20.4855V29.5269C20.3244 29.5324 20.1644 29.5457 20 29.5457Z" fill="#65471B"></path><path d="M24.4443 28.8887C24.4621 28.8843 22.8332 29.3087 21.7266 29.4287C21.3199 29.4754 20.9077 29.5132 20.4854 29.5276V34.5465H22.2221C23.4443 34.5465 24.4443 33.5465 24.4443 32.3243V28.8887ZM15.5554 28.8887C15.5377 28.8843 17.1666 29.3087 18.2732 29.4287C18.6799 29.4754 19.0921 29.5132 19.5143 29.5276V34.5465H17.7777C16.5554 34.5465 15.5554 33.5465 15.5554 32.3243V28.8887Z" fill="white"></path><path d="M30.3724 26.2544C30.1746 26.0755 29.8791 26.0644 29.6668 26.2222C29.6335 26.2466 27.1568 28.0755 23.6546 28.9666C23.1624 29.0922 21.5835 29.4444 20.0035 29.4455C18.4213 29.4455 16.8379 29.0922 16.3457 28.9666C12.8435 28.0755 10.3668 26.2466 10.3335 26.2222C10.1224 26.0644 9.82572 26.0755 9.62794 26.2544C9.43016 26.4322 9.38683 26.7244 9.5235 26.9522C9.63127 27.1322 11.6179 30.36 15.5557 31.9311V29.8989C15.5379 29.8944 17.1668 30.3189 18.2735 30.4389C18.6802 30.4855 19.0924 30.5233 19.5146 30.5377C19.6768 30.5433 19.8357 30.5555 20.0002 30.5555C20.1646 30.5555 20.3235 30.5433 20.4868 30.5377C20.9091 30.5233 21.3213 30.4866 21.7279 30.4389C22.8346 30.3189 24.4635 29.8944 24.4457 29.8989V31.9311C28.3835 30.36 30.3702 27.1322 30.4779 26.9522C30.6135 26.7244 30.5702 26.4322 30.3724 26.2544ZM29.5824 15.5822C29.5824 17.4866 28.5402 19.0311 27.2535 19.0311C25.9679 19.0311 24.9246 17.4866 24.9246 15.5822C24.9246 13.6777 25.9668 12.1333 27.2535 12.1333C28.5402 12.1333 29.5824 13.6777 29.5824 15.5822ZM10.5079 15.5822C10.5079 17.4866 11.5502 19.0311 12.8368 19.0311C14.1224 19.0311 15.1657 17.4866 15.1657 15.5822C15.1657 13.6777 14.1235 12.1333 12.8368 12.1333C11.5502 12.1333 10.5079 13.6777 10.5079 15.5822Z" fill="#65471B"></path><path d="M38.6755 10.6965C38.4855 10.5121 37.2678 11.001 36.0355 10.3732C33.4933 9.07765 27.0689 7.82765 22.8867 10.791C22.4389 11.1076 20.5678 11.161 20.0444 11.1388C19.5211 11.1621 17.65 11.1088 17.2022 10.791C13.0211 7.82765 6.59666 9.07765 4.05443 10.3732C2.82221 11.001 1.60443 10.5121 1.41443 10.6965C1.13999 10.9621 1.13999 12.0254 1.41555 12.2921C1.68888 12.5576 3.05666 12.8643 3.32888 13.661C3.60332 14.4588 3.60555 19.1699 5.78777 20.7988C7.8311 22.3232 12.5978 22.7821 15.6189 21.0632C18.2544 19.5643 18.1622 16.4088 18.6455 14.5288C18.8178 13.8588 19.3033 13.521 20.0455 13.521C20.7878 13.521 21.2733 13.8588 21.4455 14.5288C21.9289 16.4076 21.8355 19.5643 24.4722 21.0632C27.4933 22.781 32.26 22.3221 34.3022 20.7988C36.4855 19.171 36.4878 14.4588 36.7611 13.661C37.0333 12.8643 38.4011 12.5565 38.6744 12.2921C38.95 12.0254 38.9511 10.9621 38.6755 10.6965ZM16.2378 14.7521C16.1522 15.9799 15.9333 18.3376 14.4633 19.1743C13.5622 19.6876 12.3878 19.9999 11.1589 19.9999H11.1578C9.79666 19.9999 7.90999 19.6143 7.17221 19.0643C6.24999 18.3765 5.89888 15.5454 5.76666 14.4865C5.68221 13.8121 5.45555 12.1643 6.19777 11.911C7.37555 11.5099 9.01888 11.1965 10.7 11.1965C11.47 11.1965 14.0567 11.2443 15.3167 12.0199C16.4333 12.7054 16.2855 14.0765 16.2378 14.7521ZM34.3244 14.471C34.1922 15.531 33.8411 18.3765 32.9189 19.0643C32.1811 19.6143 30.2944 19.9999 28.9333 19.9999H28.9322C27.7022 19.9999 26.5289 19.6876 25.6267 19.1743C24.1567 18.3388 23.9378 15.9954 23.8522 14.7676C23.8055 14.0921 23.6567 12.711 24.7733 12.0254C26.0344 11.2499 28.62 11.1965 29.39 11.1965C31.0711 11.1965 32.7133 11.5043 33.8922 11.9054C34.6344 12.1588 34.4089 13.7965 34.3244 14.471Z" fill="#292F33"></path></svg>
              <Button  fontSize="sm" me="0px" borderRadius="16px" fontWeight="500">Auto Complete</Button>
            </div>
            <div onClick={handleEmailSent} className='box_node'>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1066_2139)"><path d="M40 0H13.3323V13.3323H0V40H26.6677V26.6677H40V0Z" fill="white"></path><path opacity="0.4" d="M0 13.3325V26.6679H13.3323V40.0002H26.6677V13.3325H0Z" fill="#00B2E3"></path><path d="M13.3323 26.6675H0V39.9998H13.3323V26.6675Z" fill="#1A82E2"></path><g><path d="M26.6677 13.3323V0H13.3323V13.3323V26.6677H26.6677H40V13.3323H26.6677Z" fill="#00B2E3"></path></g><path d="M40 0H26.6677V13.3323H40V0Z" fill="#1A82E2"></path></g><defs><clipPath id="clip0_1066_2139"><rect width="40" height="40" fill="white"></rect></clipPath></defs></svg>
              <Button  fontSize="sm" me="0px" borderRadius="16px" fontWeight="500">Sent Email</Button>
            </div>
            <div onClick={AdduploadDocument} className='box_node'>
              <Button  fontSize="sm" me="0px" borderRadius="16px" fontWeight="500">Document Upload</Button>
            </div>
            <div className='box_node' onClick={handleaskquestion}>
              <svg width="38" height="40" viewBox="0 0 38 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M33.0705 35.5556C33.0705 38.01 31.0962 40 28.6611 40H4.40919C1.97408 40 -0.000244141 38.01 -0.000244141 35.5556V4.44444C-0.000244141 1.99 1.97408 0 4.40919 0H28.6611C31.0962 0 33.0705 1.99 33.0705 4.44444V35.5556Z" fill="#CCD6DD"></path><path d="M28.6611 26.6667C28.6611 27.2812 28.1683 27.7778 27.5587 27.7778H5.51154C4.90304 27.7778 4.40918 27.2812 4.40918 26.6667C4.40918 26.0523 4.90304 25.5556 5.51154 25.5556H27.5587C28.1683 25.5556 28.6611 26.0523 28.6611 26.6667ZM11.0233 31.1112C11.0233 31.7256 10.5295 32.2223 9.92098 32.2223H5.51154C4.90304 32.2223 4.40918 31.7256 4.40918 31.1112C4.40918 30.4967 4.90304 30.0001 5.51154 30.0001H9.92098C10.5295 30.0001 11.0233 30.4967 11.0233 31.1112ZM28.6611 8.88894C28.6611 9.50228 28.1683 10.0001 27.5587 10.0001H5.51154C4.90304 10.0001 4.40918 9.50228 4.40918 8.88894C4.40918 8.27561 4.90304 7.77783 5.51154 7.77783H27.5587C28.1683 7.77783 28.6611 8.27561 28.6611 8.88894ZM28.6611 13.3334C28.6611 13.9478 28.1683 14.4445 27.5587 14.4445H5.51154C4.90304 14.4445 4.40918 13.9478 4.40918 13.3334C4.40918 12.7189 4.90304 12.2223 5.51154 12.2223H27.5587C28.1683 12.2223 28.6611 12.7189 28.6611 13.3334ZM28.6611 17.7778C28.6611 18.3923 28.1683 18.8889 27.5587 18.8889H5.51154C4.90304 18.8889 4.40918 18.3923 4.40918 17.7778C4.40918 17.1634 4.90304 16.6667 5.51154 16.6667H27.5587C28.1683 16.6667 28.6611 17.1634 28.6611 17.7778ZM28.6611 22.2223C28.6611 22.8367 28.1683 23.3334 27.5587 23.3334H5.51154C4.90304 23.3334 4.40918 22.8367 4.40918 22.2223C4.40918 21.6078 4.90304 21.1112 5.51154 21.1112H27.5587C28.1683 21.1112 28.6611 21.6078 28.6611 22.2223Z" fill="#99AAB5"></path><path d="M33.0706 6.96877C32.159 6.37432 31.0456 6.32543 30.2916 6.94321L29.4185 7.66099L27.7826 9.00654L27.6724 9.09543L25.0532 11.2488L11.9593 22.011C11.4776 22.4077 11.0852 23.3654 10.6663 24.3154C10.2496 25.2599 9.59809 27.4843 9.07557 29.1943C8.91243 29.4721 7.90156 31.2454 8.46817 31.9199C9.0414 32.6032 11.0323 31.931 11.299 31.8354C13.0915 31.6421 15.4119 31.421 16.4228 31.191C17.4414 30.9565 18.4666 30.7521 18.9483 30.3554C18.9571 30.3488 18.9593 30.3354 18.967 30.3299L32.0388 19.5899L32.9119 18.8721L33.0706 18.741V6.96877Z" fill="#66757F"></path><path d="M18.8998 25.029C18.8998 25.029 17.4954 22.939 16.5661 22.1923C15.8253 21.2557 13.7562 19.8412 13.7562 19.8412C13.2623 19.3457 12.4433 19.3079 11.9604 19.7935C11.4787 20.2801 11.0863 21.3112 10.6674 22.339C10.1471 23.6123 9.26077 26.9546 8.71841 28.7301C8.62691 29.0323 9.28833 28.2301 9.27289 28.4968C9.26187 28.7046 9.30266 28.9346 9.35447 29.1423L9.19352 29.319L9.42282 29.3935C9.45038 29.4846 9.47793 29.5646 9.49778 29.6268L9.67305 29.4646C9.87919 29.5168 10.1074 29.5579 10.3124 29.5468C10.577 29.5312 9.77998 30.199 10.0809 30.1057C11.8425 29.5579 15.1595 28.6657 16.4217 28.1412C17.4403 27.7179 18.4655 27.3235 18.9472 26.8368C19.4311 26.3535 19.3948 25.5279 18.8998 25.029Z" fill="#D99E82"></path><path d="M26.8004 4.83413C25.8348 5.80635 25.8348 7.38191 26.8004 8.35413L30.2916 11.8741C31.2573 12.8452 32.8204 12.8452 33.7839 11.8741L37.2773 8.35413C38.2407 7.38191 38.2407 5.80635 37.2773 4.83413L33.7839 1.31413C32.8204 0.341905 31.2573 0.341905 30.2916 1.31413L26.8004 4.83413Z" fill="#EA596E"></path><path d="M11.9595 19.7946L15.454 23.3168L18.9429 26.8346L32.0401 13.6357L25.0544 6.5957L11.9595 19.7946Z" fill="#FFCC4D"></path><path d="M11.3518 29.7133C11.3518 29.7133 9.08096 30.9721 8.46804 30.3533C7.85403 29.7333 9.10851 27.4521 9.10851 27.4521C9.10851 27.4521 11.2592 27.4921 11.3518 29.7133Z" fill="#292F33"></path><path d="M25.0542 6.59434L29.4195 2.19434L36.4041 9.23545L32.0387 13.6354L25.0542 6.59434Z" fill="#CCD6DD"></path><path d="M27.6723 3.95324L28.5454 3.07324L35.5299 10.1121L34.6568 10.9921L27.6723 3.95324ZM25.9272 5.71324L26.7992 4.83435L33.7838 11.8732L32.9107 12.7532L25.9272 5.71324Z" fill="#99AAB5"></path></svg>
              <Button  fontSize="sm" me="0px" borderRadius="16px" fontWeight="500">Ask A Question</Button>
            </div>
            <div className='box_node' onClick={handleaskname}>
              <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.2429 0.50978C18.4333 -0.421583 11.8201 -0.168082 10.1669 2.03413C5.86853 2.119 0.826924 6.09907 0.165391 11.3511C-0.488513 16.5484 0.969694 18.9617 1.48846 22.8703C2.07588 27.2982 4.50514 28.7142 6.44832 29.3072C9.24267 33.0896 12.2136 32.9277 17.2007 32.9277C26.9406 32.9277 31.579 26.2496 31.9887 14.9079C32.2361 8.04779 28.3083 2.8527 21.2429 0.50978Z" fill="#FFAC33"></path><path d="M26.8132 15.3927C25.8704 14.056 24.664 12.9795 22.019 12.5975C23.0107 13.0632 23.961 14.6724 24.0853 15.5614C24.2095 16.4503 24.3338 17.1706 23.548 16.2817C20.4027 12.7193 16.9763 14.1219 13.5814 11.9454C11.2099 10.4255 10.4884 8.74365 10.4884 8.74365C10.4884 8.74365 10.1996 10.9883 6.60316 13.2754C5.56127 13.9387 4.31776 15.4151 3.62789 17.5949C3.13201 19.1617 3.28568 20.5599 3.28568 22.9475C3.28568 29.9182 8.89182 35.7789 15.808 35.7789C22.7241 35.7789 28.3302 29.8668 28.3302 22.9475C28.3313 18.6112 27.8877 16.9182 26.8132 15.3927Z" fill="#FFDC5D"></path><path d="M26.0263 26.7946C24.8907 28.023 22.6205 30.4798 20.3504 29.2514C17.1397 27.5138 15.809 28.023 15.809 28.023C15.809 28.023 14.4783 27.5149 11.2677 29.2514C8.99754 30.4798 6.72631 28.023 5.59179 26.7946C4.78857 25.9258 2.18604 24.3377 2.18604 26.7946C2.18604 30.4798 4.45617 32.9367 4.45617 32.9367C6.72631 39.0787 11.2677 39.0787 11.2677 39.0787C12.4033 40.3072 19.2148 40.3072 20.3493 39.0787C20.3493 39.0787 24.8907 39.0787 27.1608 32.9367C27.1608 32.9367 29.431 30.4798 29.431 26.7946C29.432 24.3377 26.8284 25.9269 26.0263 26.7946Z" fill="#FFAC33"></path><path d="M15.809 32.9378C11.2676 32.9378 7.86189 30.481 15.809 30.481C23.7561 30.481 20.3504 32.9378 15.809 32.9378Z" fill="#FFDC5D"></path><path d="M17.1998 26.5119H14.4175C14.0328 26.5119 13.7222 26.1936 13.7222 25.7994C13.7222 25.4052 14.0328 25.0869 14.4175 25.0869H17.1998C17.5846 25.0869 17.8952 25.4052 17.8952 25.7994C17.8952 26.1936 17.5846 26.5119 17.1998 26.5119Z" fill="#C1694F"></path><path d="M10.2433 21.5224C9.47495 21.5224 8.85156 20.8836 8.85156 20.0963V18.6702C8.85156 17.8829 9.47495 17.2441 10.2433 17.2441C11.0116 17.2441 11.635 17.8829 11.635 18.6702V20.0963C11.635 20.8836 11.0116 21.5224 10.2433 21.5224ZM21.3738 21.5224C20.6055 21.5224 19.9821 20.8836 19.9821 20.0963V18.6702C19.9821 17.8829 20.6055 17.2441 21.3738 17.2441C22.1422 17.2441 22.7656 17.8829 22.7656 18.6702V20.0963C22.7656 20.8836 22.1422 21.5224 21.3738 21.5224Z" fill="#662113"></path></svg>
              <Button  fontSize="sm" me="0px" borderRadius="16px" fontWeight="500">Ask For Name</Button>
            </div>
            <div onClick={handleasknumber} className='box_node'>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39.9998 35.5556C39.9998 38.01 38.0098 40 35.5553 40H4.4442C1.98976 40 -0.000244141 38.01 -0.000244141 35.5556V4.44444C-0.000244141 1.99 1.98976 0 4.4442 0H35.5553C38.0098 0 39.9998 1.99 39.9998 4.44444V35.5556Z" fill="#3B88C3"></path><path d="M10.6808 6.77311H9.43529C8.42196 6.77311 7.99973 6.03422 7.99973 5.31644C7.99973 4.57756 8.52751 3.85978 9.43529 3.85978H12.4331C13.3408 3.85978 13.8475 4.51422 13.8475 5.35867V17.3698C13.8475 18.4253 13.172 19.0153 12.2642 19.0153C11.3564 19.0153 10.6808 18.4242 10.6808 17.3698V6.77311ZM16.3797 25.2476C16.3797 26.5764 15.8097 27.7376 14.6486 28.4764C16.1686 29.1731 17.2242 30.5876 17.2242 32.2542C17.2242 34.7876 14.902 36.9187 11.9042 36.9187C8.77973 36.9187 6.83862 34.6187 6.83862 32.9509C6.83862 32.1287 7.70418 31.5376 8.46418 31.5376C9.89862 31.5376 9.56196 34.0076 11.9464 34.0076C13.0442 34.0076 13.9308 33.1631 13.9308 32.0442C13.9308 29.0887 10.342 31.2631 10.342 28.7731C10.342 26.5564 13.3397 28.0553 13.3397 25.712C13.3397 24.9098 12.7697 24.2976 11.8197 24.2976C9.81418 24.2976 10.0886 26.3664 8.65307 26.3664C7.78751 26.3664 7.28085 25.5853 7.28085 24.8042C7.28085 23.1587 9.53973 21.3853 11.8831 21.3853C14.9231 21.3842 16.3797 23.5998 16.3797 25.2476ZM31.2386 16.102C32.1675 16.102 32.8831 16.5242 32.8831 17.4953C32.8831 18.4664 32.1675 18.8887 31.3642 18.8887H24.3131C23.3853 18.8887 22.6686 18.4664 22.6686 17.4953C22.6686 17.052 22.942 16.672 23.1542 16.4187C24.9064 14.3287 26.8053 12.4298 28.4086 10.1076C28.7897 9.55867 29.1486 8.90422 29.1486 8.14422C29.1486 7.27867 28.4931 6.51867 27.6286 6.51867C25.2008 6.51867 26.362 9.93867 24.3353 9.93867C23.322 9.93867 22.7942 9.22089 22.7942 8.39756C22.7942 5.73756 25.1586 3.60645 27.7553 3.60645C30.3508 3.60645 32.4408 5.31645 32.4408 7.99645C32.4408 10.9309 29.1697 13.8431 27.3753 16.102H31.2386ZM23.5342 33.3531C22.4997 33.3531 22.0564 32.6564 22.0564 32.1076C22.0564 31.6431 22.2253 31.3898 22.3531 31.1787L27.0808 22.6087C27.5453 21.7642 28.1364 21.3842 29.2342 21.3842C30.4586 21.3842 31.6608 22.1653 31.6608 24.0864V30.5664H32.0197C32.8431 30.5664 33.4975 31.1153 33.4975 31.9598C33.4975 32.8042 32.8431 33.3531 32.0197 33.3531H31.6608V35.1464C31.6608 36.2653 31.2186 36.7942 30.142 36.7942C29.0653 36.7942 28.622 36.2653 28.622 35.1464V33.3531H23.5342ZM28.6208 24.6776H28.5786L25.7297 30.5664H28.622V24.6776H28.6208Z" fill="white"></path></svg>
              <Button  fontSize="sm" me="0px" borderRadius="16px" fontWeight="500">Ask For Number</Button>
            </div>
            <div onClick={handleAddLeadScoring} className='box_node'>
              <Button  fontSize="sm" me="0px" borderRadius="16px" fontWeight="500">Lead Scoring</Button>
            </div>
            <div onClick={handleAddAddress} className='box_node'>
              <svg width="18" height="40" viewBox="0 0 18 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.99988 39.9998C11.4852 39.9998 13.4999 39.2536 13.4999 38.3332C13.4999 37.4127 11.4852 36.6665 8.99988 36.6665C6.5146 36.6665 4.49988 37.4127 4.49988 38.3332C4.49988 39.2536 6.5146 39.9998 8.99988 39.9998Z" fill="#292F33"></path><path d="M4.88159 11.9165C4.88159 11.9165 7.75597 38.8865 9.00134 38.8887C10.2456 38.8898 13.1188 11.9165 13.1188 11.9165H4.88159Z" fill="#99AAB5"></path><path d="M9 17.7778C13.9706 17.7778 18 13.7981 18 8.88889C18 3.97969 13.9706 0 9 0C4.02944 0 0 3.97969 0 8.88889C0 13.7981 4.02944 17.7778 9 17.7778Z" fill="#DD2E44"></path></svg>
              <Button  fontSize="sm" me="0px" borderRadius="16px" fontWeight="500">Ask Address</Button>
            </div>
            <div onClick={handleAddURL} className='box_node'>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 0C8.95444 0 0 8.95444 0 20C0 31.0456 8.95444 40 20 40C31.0456 40 40 31.0456 40 20C40 8.95444 31.0456 0 20 0ZM2.27778 21.1111H6.70333C6.80556 23.8956 7.28333 26.5233 8.06889 28.8889H4.62C3.27889 26.5744 2.45333 23.9344 2.27778 21.1111ZM21.1111 8.88889V2.31222C24.1633 2.79667 26.8467 5.26222 28.6656 8.88889H21.1111ZM29.6122 11.1111C30.45 13.4256 30.9667 16.0667 31.0756 18.8889H21.1111V11.1111H29.6122ZM18.8889 2.31222V8.88889H11.3344C13.1522 5.26222 15.8367 2.79667 18.8889 2.31222ZM18.8889 11.1111V18.8889H8.92444C9.03333 16.0667 9.55 13.4256 10.3878 11.1111H18.8889ZM6.70444 18.8889H2.27778C2.45333 16.0667 3.27889 13.4256 4.61889 11.1111H8.06778C7.28444 13.4767 6.80667 16.1056 6.70444 18.8889ZM8.92444 21.1111H18.8889V28.8889H10.3878C9.55 26.5744 9.03333 23.9344 8.92444 21.1111ZM18.8889 31.1111V37.6878C15.8367 37.2022 13.1522 34.7378 11.3344 31.1111H18.8889ZM21.1111 37.6878V31.1111H28.6667C26.8478 34.7378 24.1633 37.2022 21.1111 37.6878ZM21.1111 28.8889V21.1111H31.0767C30.9667 23.9344 30.4511 26.5744 29.6133 28.8889H21.1111ZM33.2967 21.1111H37.7211C37.5467 23.9344 36.7211 26.5744 35.38 28.8889H31.9311C32.7156 26.5233 33.1933 23.8956 33.2967 21.1111ZM33.2967 18.8889C33.1933 16.1056 32.7156 13.4767 31.9311 11.1111H35.38C36.7211 13.4256 37.5467 16.0667 37.7211 18.8889H33.2967ZM33.8656 8.88889H31.0844C30.2878 7.10667 29.3 5.53889 28.1744 4.22333C30.3844 5.37 32.3211 6.96333 33.8656 8.88889ZM11.8256 4.22333C10.6989 5.53889 9.71111 7.10667 8.91444 8.88889H6.13444C7.67889 6.96333 9.61556 5.37111 11.8256 4.22333ZM6.13444 31.1111H8.91556C9.71111 32.8933 10.6989 34.4611 11.8256 35.7756C9.61556 34.6289 7.67889 33.0367 6.13444 31.1111ZM28.1744 35.7756C29.3011 34.46 30.2878 32.8933 31.0844 31.1111H33.8656C32.3211 33.0367 30.3844 34.6289 28.1744 35.7756Z" fill="#3B88C3"></path></svg>
              <Button fontSize="sm" me="0px" borderRadius="16px" fontWeight="500">Ask For A URL</Button>
            </div>
            <div onClick={handleAddRating} className='box_node'>
              <svg width="40" height="38" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.9261 38C30.4508 38 29.9779 37.8551 29.5708 37.5666L20.0003 30.7514L10.4297 37.5666C9.61439 38.146 8.52027 38.146 7.70969 37.5572C6.8991 36.9743 6.55792 35.9393 6.86145 34.9942L10.4309 23.5553L0.946166 16.9189C0.140285 16.3289 -0.195009 15.2916 0.113226 14.3454C0.423814 13.4015 1.30852 12.7601 2.30852 12.7531L14.0556 12.7356L17.7956 1.58056C18.1108 0.635494 18.9991 0 20.0003 0C21.0014 0 21.8897 0.636662 22.2061 1.58056L25.8826 12.7356L37.6897 12.7531C38.6932 12.7601 39.5791 13.4026 39.8861 14.3454C40.1955 15.2916 39.8602 16.3289 39.0532 16.9189L29.5685 23.5553L33.1379 34.9942C33.4438 35.9393 33.0991 36.9743 32.2908 37.5572C31.8826 37.854 31.405 38 30.9261 38Z" fill="#FFAC33"></path></svg>
              <Button fontSize="sm" me="0px" borderRadius="16px" fontWeight="500">Rate</Button>
            </div>
            <div onClick={handleopinionRating} className='box_node'>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M33.7901 38.6557C31.9972 40.4487 29.0927 40.4475 27.3021 38.6557L1.34426 12.699C-0.447515 10.9073 -0.448662 8.00278 1.34426 6.20986L6.21143 1.34383C8.00321 -0.447945 10.9088 -0.447945 12.7006 1.34383L38.655 27.3005C40.4468 29.0923 40.4468 31.9991 38.6562 33.7886L33.7901 38.6557Z" fill="#FFCC4D"></path><path d="M10.2676 7.02209C9.81908 7.46946 9.09411 7.46946 8.64559 7.02209C8.19822 6.57357 8.19822 5.84746 8.64559 5.39894L12.7018 1.34277L14.3238 2.96593L10.2676 7.02209ZM16.7556 8.6441C16.3083 9.09262 15.581 9.09262 15.1336 8.6441C14.6851 8.19558 14.6851 7.46946 15.1336 7.02209L16.7568 5.39894L18.3788 7.02209L16.7556 8.6441ZM18.3788 15.1321C17.9303 15.5806 17.2041 15.5806 16.7568 15.1321C16.3094 14.6836 16.3094 13.9575 16.7568 13.5101L20.8129 9.45396C21.3704 10.0114 21.8786 10.5185 22.4349 11.0771L18.3788 15.1321ZM24.8668 16.7541C24.4194 17.2027 23.6933 17.2027 23.2459 16.7541C22.7963 16.3056 22.7974 15.5795 23.2459 15.1321L24.868 13.509C25.4243 14.0676 25.9325 14.5735 26.49 15.1321L24.8668 16.7541ZM26.49 23.2433C26.0414 23.6918 25.3165 23.693 24.868 23.2433C24.4194 22.7948 24.4194 22.0698 24.8668 21.6213L28.923 17.5663L30.545 19.1883L26.49 23.2433ZM34.6011 31.3545C34.1538 31.803 33.4277 31.803 32.9803 31.3545C32.5306 30.906 32.5306 30.181 32.9791 29.7325L37.0353 25.6775L38.6573 27.2995L34.6011 31.3545ZM32.978 24.8653C32.5295 25.3138 31.8056 25.3138 31.356 24.8665C30.9075 24.4179 30.9086 23.6918 31.356 23.2445L32.9791 21.6225L34.6 23.2433L32.978 24.8653Z" fill="#292F33"></path></svg>
              <Button fontSize="sm" me="0px" borderRadius="16px" fontWeight="500">Opinion Scale</Button>
            </div>
            <div onClick={handleAddDate} className='box_node'>
              <svg width="38" height="40" viewBox="0 0 38 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M38 35.5554C38 38.0099 35.9983 39.9999 33.5294 39.9999H4.47059C2.00171 39.9999 0 38.0099 0 35.5554V8.88878C0 6.43434 2.00171 4.44434 4.47059 4.44434H33.5294C35.9983 4.44434 38 6.43434 38 8.88878V35.5554Z" fill="#292F33"></path><path d="M35.7646 35.5558C35.7646 36.7824 34.7632 37.778 33.5293 37.778H4.47052C3.23664 37.778 2.23523 36.7824 2.23523 35.5558V13.3336C2.23523 12.1069 3.23664 11.1113 4.47052 11.1113H33.5293C34.7632 11.1113 35.7646 12.1069 35.7646 13.3336V35.5558Z" fill="#E1E8ED"></path><path d="M24.717 22.7599H18.8996C17.6724 22.7599 17.2187 21.9688 17.2187 21.201C17.2187 20.4099 17.6501 19.6421 18.8996 19.6421H27.1277C28.2879 19.6421 28.764 20.681 28.764 21.2688C28.764 21.721 28.5136 22.1954 28.2409 22.7599L22.6046 34.1488C21.9687 35.4143 21.7183 35.8654 20.6957 35.8654C19.445 35.8654 18.8091 34.9165 18.8091 34.261C18.8091 33.9899 18.8773 33.7865 19.0371 33.4699L24.717 22.7599ZM11.8808 22.6399H11.3779C10.287 22.6399 9.83215 21.9088 9.83215 21.141C9.83215 20.3499 10.401 19.6421 11.3779 19.6421H13.4042C14.381 19.6421 14.9264 20.3432 14.9264 21.2465V34.1043C14.9264 35.2332 14.3653 35.8665 13.3885 35.8665C12.4117 35.8665 11.8808 35.2343 11.8808 34.1043V22.6399Z" fill="#66757F"></path><path d="M35.7646 17.7776H2.23523V8.88873C2.23523 7.66206 3.23664 6.6665 4.47052 6.6665H33.5293C34.7632 6.6665 35.7646 7.66206 35.7646 8.88873V17.7776Z" fill="#DD2E44"></path><path d="M15.9375 10.6714C15.9375 10.1158 16.2728 9.80469 16.7221 9.80469C17.1714 9.80469 17.5056 10.1158 17.5056 10.6714V15.1347H19.3665C19.8996 15.1347 20.1287 15.5569 20.1175 15.9347C20.0974 16.3014 19.8258 16.6669 19.3665 16.6669H16.7534C16.2415 16.6669 15.9375 16.3125 15.9375 15.7569V10.6714ZM8.71195 10.6714C8.71195 10.1158 9.04612 9.80469 9.49653 9.80469C9.94583 9.80469 10.28 10.1158 10.28 10.6714V13.4358C10.28 14.458 10.8969 15.268 11.8894 15.268C12.8394 15.268 13.4877 14.4136 13.4877 13.4358V10.6714C13.4877 10.1158 13.8218 9.80469 14.2722 9.80469C14.7215 9.80469 15.0557 10.1158 15.0557 10.6714V13.5247C15.0557 15.3902 13.6128 16.8014 11.8894 16.8014C10.1448 16.8014 8.71195 15.4125 8.71195 13.5247V10.6714ZM7.89495 14.4458C7.89495 16.3114 6.7773 16.8002 5.82618 16.8002C5.1053 16.8002 3.90271 16.5002 3.90271 15.5336C3.90271 15.2347 4.14412 14.8569 4.48836 14.8569C4.90636 14.8569 5.27295 15.268 5.74236 15.268C6.328 15.268 6.328 14.6902 6.328 14.3347V10.6714C6.328 10.1158 6.66106 9.80469 7.11036 9.80469C7.56077 9.80469 7.89495 10.1158 7.89495 10.6714V14.4458Z" fill="#F5F8FA"></path><path d="M32.4118 15.5558C32.4118 16.1691 32.9114 16.6669 33.5295 16.6669C34.1475 16.6669 34.6471 16.1691 34.6471 15.5558C34.6471 14.9424 34.1475 14.4447 33.5295 14.4447C32.9114 14.4447 32.4118 14.9424 32.4118 15.5558ZM29.0589 15.5558C29.0589 16.1691 29.5585 16.6669 30.1765 16.6669C30.7946 16.6669 31.2942 16.1691 31.2942 15.5558C31.2942 14.9424 30.7946 14.4447 30.1765 14.4447C29.5585 14.4447 29.0589 14.9424 29.0589 15.5558ZM25.7059 15.5558C25.7059 16.1691 26.2055 16.6669 26.8236 16.6669C27.4416 16.6669 27.9412 16.1691 27.9412 15.5558C27.9412 14.9424 27.4416 14.4447 26.8236 14.4447C26.2055 14.4447 25.7059 14.9424 25.7059 15.5558ZM25.7059 12.2224C25.7059 12.8358 26.2055 13.3336 26.8236 13.3336C27.4416 13.3336 27.9412 12.8358 27.9412 12.2224C27.9412 11.6091 27.4416 11.1113 26.8236 11.1113C26.2055 11.1113 25.7059 11.6091 25.7059 12.2224ZM29.0589 12.2224C29.0589 12.8358 29.5585 13.3336 30.1765 13.3336C30.7946 13.3336 31.2942 12.8358 31.2942 12.2224C31.2942 11.6091 30.7946 11.1113 30.1765 11.1113C29.5585 11.1113 29.0589 11.6091 29.0589 12.2224ZM32.4118 12.2224C32.4118 12.8358 32.9114 13.3336 33.5295 13.3336C34.1475 13.3336 34.6471 12.8358 34.6471 12.2224C34.6471 11.6091 34.1475 11.1113 33.5295 11.1113C32.9114 11.1113 32.4118 11.6091 32.4118 12.2224Z" fill="#F4ABBA"></path><path d="M11.1765 7.77778C11.1765 8.39111 10.6758 8.88889 10.0588 8.88889C9.44187 8.88889 8.94116 8.39111 8.94116 7.77778V1.11111C8.94116 0.497778 9.44187 0 10.0588 0C10.6758 0 11.1765 0.497778 11.1765 1.11111V7.77778ZM29.0588 7.77778C29.0588 8.39111 28.5592 8.88889 27.9412 8.88889C27.3231 8.88889 26.8235 8.39111 26.8235 7.77778V1.11111C26.8235 0.497778 27.3231 0 27.9412 0C28.5592 0 29.0588 0.497778 29.0588 1.11111V7.77778Z" fill="#99AAB5"></path></svg>
              <Button fontSize="sm" me="0px" borderRadius="16px" fontWeight="500">Ask Date</Button>
            </div>
            <div onClick={handleAddFile} className='box_node'>
              <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 31.2C0 33.8508 2.10706 36 4.70588 36H32.9412C35.54 36 37.6471 33.8508 37.6471 31.2V10.8C37.6471 8.1492 35.54 6 32.9412 6H22.3529C18.1624 6 18.8235 0 12.4259 0H4.70588C2.10706 0 0 2.1492 0 4.8V31.2Z" fill="#226699"></path><path d="M35.2941 8.3999H27.5741C21.1765 8.3999 21.8376 14.3999 17.6471 14.3999H7.05882C4.46 14.3999 2.35294 16.5491 2.35294 19.1999V31.1999C2.35294 31.8635 1.82588 32.3999 1.17647 32.3999C0.527059 32.3999 0 31.8635 0 31.1999C0 33.8507 2.10706 35.9999 4.70588 35.9999H35.2941C37.8929 35.9999 40 33.8507 40 31.1999V13.1999C40 10.5491 37.8929 8.3999 35.2941 8.3999Z" fill="#55ACEE"></path></svg>
              <Button fontSize="sm" me="0px" borderRadius="16px" fontWeight="500">Ask File</Button>
            </div>
            <div onClick={handleAddBusnisshours} className='box_node'>
              <Button fontSize="sm" me="0px" borderRadius="16px" fontWeight="500">Ask Busniss Hours</Button>
            </div>
          </div>
        </div>
      )}
      {addMessage && (
        <div className={`newsetmessage ${messageForm} absolute bg-gray-300 w-[400px] rounded-md`}>
          <AskButton closeform={closeform} onSubmit={addNewField} />
        </div>
      )}
      {addUpload && (
        <div className={`newsetmessage ${messageForm} absolute bg-gray-300 w-[400px] rounded-md`}>
          <div className='grid grid-cols-2 px-4 justify-between items-center'>
            <div className='frm_hdr_ttle'>
              <h2>Upload Media</h2>
            </div>
            <div className='closebutton'>
              <Button className='close_icns' onClick={closeform} fontSize="sm" me="0px" mb="26px" borderRadius="16px" fontWeight="500"
              >
                <MdClose />
              </Button>
            </div>
          </div>
          <label>Add Media here:</label>
          <input
            onChange={(e) => setUploadText(e.target.value)}
            type="file"
          />
          <button onClick={addUploadMedia}>Add Media</button>
        </div>
      )}
      {uploadDocument && (
        <div className={`newsetmessage ${messageForm} absolute bg-gray-300 w-[400px] rounded-md`}>
          <div className='grid grid-cols-2 px-4 justify-between items-center'>
            <div className='frm_hdr_ttle'>
              <h2>Upload only csv file</h2>
            </div>
            <div className='closebutton'>
              <Button className='close_icns' onClick={closeform} fontSize="sm" me="0px" mb="26px" borderRadius="16px" fontWeight="500"
              >
                <MdClose />
              </Button>
            </div>
          </div>
          <label>Add csv file here:</label>
          <input
            onChange={(e) => setUploadText(e.target.value)}
            type="file"
            accept=".csv"
          />
          <button onClick={addUploadMedia}>Add Document</button>
        </div>
      )}


      {showForm && (
        <div className={`newsetmessage ${messageForm} absolute bg-gray-300 w-[400px] rounded-md`}>
          <div className='grid grid-cols-2 px-4 justify-between items-center'>
            <div className='frm_hdr_ttle'>
              <h2>Live Chat Yes/No</h2>
            </div>
            <div className='closebutton'>
              <Button className='close_icns' onClick={closeform} fontSize="sm" me="0px" mb="26px" borderRadius="16px" fontWeight="500"
              >
                <MdClose />
              </Button>
            </div>
          </div>
          <div className="form">
            <Button onClick={handleYesClick}>Yes</Button>
            <Button onClick={handleNoClick}>No</Button>
          </div>
        </div>
      )}

      {showAutoCompleteForm && (
        <div className={`newsetmessage ${messageForm} absolute bg-gray-300 w-[400px] rounded-md`}>
          <div className='grid grid-cols-2 px-4 justify-between items-center'>
            <div className='frm_hdr_ttle'>
              <h2>Auto Complete</h2>
            </div>
            <div className='closebutton'>
              <Button className='close_icns' onClick={closeform} fontSize="sm" me="0px" mb="26px" borderRadius="16px" fontWeight="500"
              >
                <MdClose />
              </Button>
            </div>
          </div>
          <label>Auto Complete:</label>
          <textarea type="text" placeholder="Type here..." />
          <Button onClick={() => { /* Handle auto-complete functionality */ }}>Auto Complete</Button>
        </div>
      )}

      {formSubmit && (
        <div className={`newsetmessage ${messageForm} absolute bg-gray-300 w-[400px] rounded-md form-container`}>
          <div className='grid grid-cols-2 px-4 justify-between items-center'>
            <div className='frm_hdr_ttle'>
              <h2>Add Email address</h2>
            </div>
            <div className='closebutton'>
              <Button className='close_icns' onClick={closeform} fontSize="sm" me="0px" mb="26px" borderRadius="16px" fontWeight="500"
              >
                <MdClose />
              </Button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="email-form">
            <div className="form-group">
              <label>Add email here:</label>
              <input
                type="email"
                id="emailInput"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className={emailError ? 'error' : ''}
              />
              {emailError && <div className="error-message">{emailError}</div>}
            </div>
            <button type="submit">Submit Email</button>
          </form>
        </div>
      )}

      {LeadGenration && (
        <div className={`newsetmessage ${messageForm} absolute bg-gray-300 w-[400px] rounded-md`}>
          <AskQuestion closeform={closeform} onSubmit={addNewLeadGenNode} />
        </div>
      )}

      {LeadGenrationName && (
        <div className={`newsetmessage ${messageForm} absolute bg-gray-300 w-[400px] rounded-md`}>
          <AskName closeform={closeform} onSubmit={handleaddname} />
        </div>
      )}

      {LeadGenrationNumber && (
        <div className={`newsetmessage ${messageForm} absolute bg-gray-300 w-[400px] rounded-md`}>
          <AskNumber closeform={closeform} onSubmit={handleaddnumber} />
        </div>
      )}

      {showLeadScoringForm && (
        <div className={`newsetmessage ${messageForm} absolute bg-gray-300 w-[400px] rounded-md`}>
          <LeadScoringForm onSubmit={handleLeadScoringSubmit} closeform={closeform} />
        </div>
      )}

      {showAddressForm && (
        <div className={`newsetmessage ${messageForm} absolute bg-gray-300 w-[400px] rounded-md`}>
          <AskAddress onSubmit={handleAddressSubmit} closeform={closeform} />
        </div>
      )}

      {showURLForm && (
        <div className={`newsetmessage ${messageForm} absolute bg-gray-300 w-[400px] rounded-md`}>
          <AskUrl closeform={closeform} onSubmit={handleURLSubmit} />
        </div>
      )}

      {showRatingBlock && (
        <div className={`newsetmessage ${messageForm} absolute bg-gray-300 w-[400px] rounded-md`}>
          <RatingBlock closeform={closeform} onSubmit={handleRatingSubmit} />
        </div>
      )}

      {addRatingBlock && (
        <div className={`newsetmessage ${messageForm} absolute bg-gray-300 w-[400px] rounded-md`}>
          <OpinionScale closeform={closeform} onSubmit={handleratingadd} />
        </div>
      )}

      {addDate && (
        <div className={`newsetmessage ${messageForm} absolute bg-gray-300 w-[400px] rounded-md`}>
          <AskDate closeform={closeform} onSubmit={handdateadd} />
        </div>
      )}

      {LeadGenrationFile && (
        <div className={`newsetmessage ${messageForm} absolute bg-gray-300 w-[400px] rounded-md`}>
          <AskFile closeform={closeform} onSubmit={handleaddfile} />
        </div>

      )}
      {addbussnisshours && (
        <div className={`newsetmessage ${messageForm} absolute bg-gray-300 w-[400px] rounded-md`}>
          <BusinessHoursNode closeform={closeform} onSubmit={handleBusinessHours} />
        </div>
      )}
      <div className='chatbot_flow'>{ChatFlow}</div>
    </div>
  );
}

export default Flow;