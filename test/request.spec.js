import { expect } from 'chai'
import sinon from 'sinon'
import request from '../src/request'

describe('request', () => {
  let server, requests;

  beforeEach(function () {
    global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
    sinon.xhr.supportsCORS = true;
    server = sinon.fakeServer.create();
    window.XMLHttpRequest = global.XMLHttpRequest;
  });
  afterEach(function () { server.restore(); });

  it('should getPosts', () => {
    let response = [{data: 'some_data'}]
    let callback = sinon.spy()
    request.getPosts(callback)
    server.respond("GET", "/api/posts",
            [200, { "Content-Type": "text/html; charset=utf-8" },
            JSON.stringify(response)]);
    expect(callback).to.have.been.calledOnce

    expect(callback).to.have.been.calledWith(response)
  })
})
