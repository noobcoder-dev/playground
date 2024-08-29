import React, { useState } from 'react';
import { Box, Flex, Text, Button, Select, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css'; // Ensure this theme is available
import 'codemirror/theme/eclipse.css'; // Alternative theme

function Playground() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [selectedMode, setSelectedMode] = useState('html-css-js');
  const [htmlCode, setHtmlCode] = useState('<h1>Hello World!</h1>');
  const [cssCode, setCssCode] = useState('h1 { color: blue; }');
  const [jsCode, setJsCode] = useState('console.log("JavaScript is running");');

  const codeMirrorTheme = colorMode === 'dark' ? 'dracula' : 'eclipse';
  
  // Dynamic colors for navbar based on color mode
  const navbarBgColor = useColorModeValue('gray.100', 'gray.800');
  const navbarTextColor = useColorModeValue('black', 'white');

  const iframeSrcDoc = `
    <html>
      <head>
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode}
        <script>${jsCode}<\/script>
      </body>
    </html>
  `;

  return (
    <Flex direction="column" h="100vh" overflow="hidden">
      <Flex
        align="center"
        justify="space-between"
        p="4"
        bg={navbarBgColor}
        color={navbarTextColor}
        borderBottom="1px"
        borderColor={useColorModeValue('gray.200', 'gray.600')}
      >
        <Flex align="center">
          <Box as="img" src="SkyGliders.png" alt="Logo" boxSize="40px" mr="50"   borderRadius='full'/>
          <Text fontSize="xl" fontWeight="bold">Playground</Text>
        </Flex>
        <Flex align="center">
          <Select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            width="200px"
            mr="4"
            bg={navbarTextColor}
            color={navbarBgColor}
            borderColor={navbarTextColor}
          >
            <option value="html-css-js">HTML, CSS, JavaScript</option>
            <option value="html-css">HTML & CSS</option>
          </Select>
          <Button onClick={toggleColorMode} mb="4">
            Switch to {colorMode === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </Flex>
      </Flex>
      <Flex flex="1" overflow="hidden">
        <Flex direction="column" flex="1" mr="2" minW="300px" overflow="hidden">
          {selectedMode === 'html-css-js' && (
            <>
              <ResizablePanel>
                <Text mb="2" fontWeight="bold">HTML</Text>
                <CodeMirror
                  value={htmlCode}
                  options={{
                    mode: 'htmlmixed',
                    lineNumbers: true,
                    theme: codeMirrorTheme,
                    lineWrapping: true,
                  }}
                  onBeforeChange={(editor, data, value) => setHtmlCode(value)}
                  height="100%"
                  className="code-editor"
                />
              </ResizablePanel>
              <ResizablePanel>
                <Text mb="2" mt="4" fontWeight="bold">CSS</Text>
                <CodeMirror
                  value={cssCode}
                  options={{
                    mode: 'css',
                    lineNumbers: true,
                    theme: codeMirrorTheme,
                    lineWrapping: true,
                  }}
                  onBeforeChange={(editor, data, value) => setCssCode(value)}
                  height="100%"
                  className="code-editor"
                />
              </ResizablePanel>
              <ResizablePanel>
                <Text mb="2" mt="4" fontWeight="bold">JavaScript</Text>
                <CodeMirror
                  value={jsCode}
                  options={{
                    mode: 'javascript',
                    lineNumbers: true,
                    theme: codeMirrorTheme,
                    lineWrapping: true,
                  }}
                  onBeforeChange={(editor, data, value) => setJsCode(value)}
                  height="100%"
                  className="code-editor"
                />
              </ResizablePanel>
            </>
          )}
          {selectedMode === 'html-css' && (
            <>
              <ResizablePanel>
                <Text mb="2" fontWeight="bold">HTML</Text>
                <CodeMirror
                  value={htmlCode}
                  options={{
                    mode: 'htmlmixed',
                    lineNumbers: true,
                    theme: codeMirrorTheme,
                    lineWrapping: true,
                  }}
                  onBeforeChange={(editor, data, value) => setHtmlCode(value)}
                  height="100%"
                  className="code-editor"
                />
              </ResizablePanel>
              <ResizablePanel>
                <Text mb="2" mt="4" fontWeight="bold">CSS</Text>
                <CodeMirror
                  value={cssCode}
                  options={{
                    mode: 'css',
                    lineNumbers: true,
                    theme: codeMirrorTheme,
                    lineWrapping: true,
                  }}
                  onBeforeChange={(editor, data, value) => setCssCode(value)}
                  height="100%"
                  className="code-editor"
                />
              </ResizablePanel>
            </>
          )}
        </Flex>
        <ResizablePanel flex="1">
          <Box
            flex="1"
            bg="white"
            overflow="auto"
            p="2"
            border="1px solid gray"
            borderRadius="md"
            height="100%"
          >
            <iframe
              title="preview"
              srcDoc={iframeSrcDoc}
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </Box>
        </ResizablePanel>
      </Flex>
      <Flex
        as="footer"
        justify="center"
        align="center"
        p="4"
        bg={useColorModeValue('gray.100', 'gray.800')}
        color={useColorModeValue('black', 'white')}
        borderTop="1px"
        borderColor={useColorModeValue('gray.200', 'gray.600')}
      >
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()} jaden maxi. All rights reserved.
        </Text>
      </Flex>
    </Flex>
  );
}

// ResizablePanel Component
function ResizablePanel({ children, flex = '0 1 auto' }) {
  const [size, setSize] = useState(300); // Default size

  const handleMouseDown = (e) => {
    const startY = e.clientY;

    const handleMouseMove = (e) => {
      setSize(prevSize => prevSize + (e.clientY - startY));
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      flex={flex}
      border="1px solid gray"
      borderRadius="md"
      height={`${size}px`}
      overflow="hidden"
    >
      {children}
      <Box
        cursor="row-resize"
        bg="gray.200"
        height="10px"
        onMouseDown={handleMouseDown}
      />
    </Box>
  );
}

export default Playground;
